import React from 'react'
import { Controller } from 'react-hook-form'
import { Editor } from '@tinymce/tinymce-react'

function RTE({ label, name, control, defaultValue = '' }) {
  // Match the editor chrome to the current theme when it mounts.
  const isDark = document.documentElement.classList.contains('dark')

  return (
    <div className="w-full">
      {label && <span className="mb-1.5 inline-block text-sm font-medium text-stone-700 dark:text-stone-300">{label}</span>}
      <div className="overflow-hidden rounded-xl border border-stone-200 dark:border-white/10">
        <Controller
          name={name || 'content'}
          control={control}
          render={({ field: { onChange } }) => (
            <Editor
              apiKey={import.meta.env.VITE_TINY_API_KEY}
              initialValue={defaultValue}
              init={{
                initialValue: defaultValue,
                height: 520,
                menubar: false,
                branding: false,
                promotion: false,
                statusbar: true,
                skin: isDark ? 'oxide-dark' : 'oxide',
                content_css: isDark ? 'dark' : 'default',
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  'undo redo | blocks | bold italic underline | ' +
                  'bullist numlist blockquote | link image table | ' +
                  'alignleft aligncenter alignright | removeformat code fullscreen',
                content_style:
                  `body { font-family: Inter, ui-sans-serif, system-ui, sans-serif; font-size: 16px; line-height: 1.7; max-width: 720px; margin: 1.25rem auto; padding: 0 1rem; ${isDark ? 'background:#1c1917; color:#e7e5e4;' : 'color:#292524;'} }
                   h1, h2, h3 { font-family: Fraunces, Georgia, serif; letter-spacing: -0.01em; }
                   img { max-width: 100%; height: auto; border-radius: 10px; }`,
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
    </div>
  )
}

export default RTE
