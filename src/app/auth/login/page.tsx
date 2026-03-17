'use client'


import AccessForm, { FieldConfig } from '@/components/ui/AccessForm'
import { Mail, Lock, LogIn } from 'lucide-react'

const LoginPage = () => {
  const loginFields: FieldConfig[] = [
    {
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      Icon: Mail,
      autoComplete: 'email',
      ariaLabel: 'Email'
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      Icon: Lock,
      autoComplete: 'current-password',
      ariaLabel: 'Password'
    }
  ]

  const handleLogin = async (data: Record<string, string>) => {
    // TODO: Implement login logic
    console.log('Login data:', data)
    // Esempio:
    // await signIn(data.email, data.password)
  }

  return (
    <AccessForm
      title="Bentornato"
      subtitle="Accedi al tuo account per continuare"
      fields={loginFields}
      submitText="Accedi"
      SubmitIcon={LogIn}
      linkText="Non hai un account?"
      linkHref="/auth/signup"
      linkLabel="Registrati"
      onSubmit={handleLogin}
    />
  )
}

export default LoginPage