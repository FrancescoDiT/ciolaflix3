'use client'

import React, { useState } from 'react'
import { LucideIcon } from 'lucide-react'
import GlassSurface from '@/components/GlassSurface'
import { motion } from 'framer-motion'
import Link from 'next/link'

export type FieldConfig = {
  name: string
  type: 'text' | 'email' | 'password'
  placeholder: string
  Icon: LucideIcon
  autoComplete: string
  ariaLabel: string
}

export type AccessFormProps = {
  title: string
  subtitle: string
  fields: FieldConfig[]
  submitText: string
  SubmitIcon: LucideIcon
  linkText?: string
  linkHref?: string
  linkLabel?: string
  onSubmit: (data: Record<string, string>) => Promise<void> | void
}

const AccessForm = ({
  title,
  subtitle,
  fields,
  submitText,
  SubmitIcon,
  linkText,
  linkHref,
  linkLabel,
  onSubmit
}: AccessFormProps) => {
  const [formData, setFormData] = useState<Record<string, string>>(() =>
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await onSubmit(formData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Si è verificato un errore')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <GlassSurface
          width="100%"
          height="auto"
          backgroundOpacity={0.6}
          blur={1000}
          borderRadius={28}
        >
          <div className="p-8 space-y-8">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {title}
              </h1>
              <p className="text-slate-600 dark:text-slate-300">
                {subtitle}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm text-center"
                >
                  {error}
                </motion.div>
              )}

              {/* Fields */}
              <div className="space-y-4 ">
                {fields.map((field) => (
                  <div key={field.name} className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ">
                      <field.Icon className="h-5 w-5 text-slate-400 group-focus-within:text-purple-400 transition-colors" />
                    </div>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      value={formData[field.name]}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      required
                      placeholder={field.placeholder}
                      aria-label={field.ariaLabel}
                      autoComplete={field.autoComplete}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-slate-900 dark:text-white placeholder:text-slate-500"
                    />
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full relative group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500 group-hover:duration-200" />
                <div className="relative flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-black rounded-xl text-white font-medium hover:bg-slate-800 dark:hover:bg-slate-900 transition-colors">
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <SubmitIcon className="w-5 h-5" />
                      <span>{submitText}</span>
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Registration/Login Link */}
            {linkText && linkHref && linkLabel && (
              <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                {linkText}{' '}
                <Link
                  href={linkHref}
                  className="inline-flex items-center gap-1 font-semibold text-purple-500 hover:text-purple-400 transition-colors"
                >
                  {linkLabel}
                </Link>
              </div>
            )}
          </div>
        </GlassSurface>
      </div>
    </div>
  )
}

export default AccessForm