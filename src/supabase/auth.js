import supabase from './client.js'

// The app's user shape, independent of the backend.
export function toUser(user) {
    if (!user) return null;
    return {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.email?.split('@')[0] || '',
    };
}

export class AuthService {
    /**
     * Creates the account. When email confirmation is enabled in Supabase (the default),
     * no session is returned until the user clicks the link in their inbox.
     */
    async createAccount({ email, password, name }) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name },
                emailRedirectTo: window.location.origin,
            },
        });
        if (error) throw error;

        // Supabase returns a user with no identities when the email is already registered
        // (to avoid leaking which emails exist). Surface it as a normal error.
        if (data.user && data.user.identities?.length === 0) {
            throw new Error('An account with this email already exists. Try signing in instead.');
        }

        return { session: data.session, user: toUser(data.user), needsConfirmation: !data.session };
    }

    async login({ email, password }) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return data.session;
    }

    async getCurrentUser() {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
            console.error('Supabase :: getCurrentUser', error);
            return null;
        }
        return toUser(data.session?.user);
    }

    async logout() {
        const { error } = await supabase.auth.signOut();
        if (error) console.error('Supabase :: logout', error);
    }

    // Calls back with the current user (or null) on sign-in, sign-out, token refresh and on start-up.
    onAuthChange(callback) {
        const { data } = supabase.auth.onAuthStateChange((_event, session) => {
            callback(toUser(session?.user));
        });
        return () => data.subscription.unsubscribe();
    }
}

const authService = new AuthService();

export default authService;
