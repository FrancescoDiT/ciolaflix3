'use client'

import { Mail, Lock, User, UserPlus } from 'lucide-react'
import AccessForm, {FieldConfig} from "@/components/ui/AccessForm";


const SignupPage = () => {
  const signupFields: FieldConfig[] = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Nome',
      Icon: User,
      autoComplete: 'given-name',
      ariaLabel: 'Nome'
    },
    {
      name: 'surname',
      type: 'text',
      placeholder: 'Cognome',
      Icon: User,
      autoComplete: 'family-name',
      ariaLabel: 'Cognome'
    },
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
      autoComplete: 'new-password',
      ariaLabel: 'Password'
    },
    {
      name: 'repeatPassword',
      type: 'password',
      placeholder: 'Ripeti Password',
      Icon: Lock,
      autoComplete: 'new-password',
      ariaLabel: 'Ripeti Password'
    }
  ]

  const handleSignup = async (data: Record<string, string>) => {
    // TODO: Implement signup logic
    console.log('Signup data:', data)

    // Validazione password match
    if (data.password !== data.repeatPassword) {
      throw new Error('Le password non coincidono')
    }

  }

  return (
    <AccessForm
      title="Crea un account"
      subtitle="Inizia il tuo viaggio con noi"
      fields={signupFields}
      submitText="Registrati"
      SubmitIcon={UserPlus}
      linkText="Hai già un account?"
      linkHref="/auth/login"
      linkLabel="Accedi"
      onSubmit={handleSignup}
    />
  )
}

export default SignupPage