// src/pages/Login.jsx
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { useAuth } from '@/context/AuthContext'
import InputField from '@/components/form/InputField'
import { useNavigate, Link, Navigate, useLocation } from 'react-router-dom'

function routeForRole(role) {
  console.log(role)
  if (role === 'employee') return '/employee'
  // fold other roles into admin area
  if (role === 'admin' || role === 'superadmin' || role === 'hr') return '/admin'
  return '/' // fallback
}

export default function Login() {
  const { user, loading: authLoading, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectFrom = location.state?.from?.pathname

  const [form, setForm] = React.useState({ email: '', password: '' })
  const [submitting, setSubmitting] = React.useState(false)

  function update(e) {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    try {
      // make sure your login() returns the hydrated user object.
      // if it doesn't, grab it from context after await.
      const loggedInUser = await login(form)

      const u = loggedInUser || (typeof window !== 'undefined' ? null : null) || user
      const target = redirectFrom || routeForRole(u?.role)
      toast.success('Welcome back!')
      navigate(target, { replace: true })
    } catch (err) {
      toast.error(err?.message || 'Invalid credentials / not approved / email not verified')
    } finally {
      setSubmitting(false)
    }
  }

  // if already logged in, bounce immediately to their area
  if (!authLoading && user) {
    return <Navigate to={redirectFrom || routeForRole(user.role)} replace />
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-secondary">
      <div className="container flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Log in</CardTitle>
            <CardDescription>Use your work email and password.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={onSubmit}>
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={update}
                required
                autoComplete="email"
              />
              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={update}
                required
                autoComplete="current-password"
              />
              <Button
                type="submit"
                disabled={submitting || authLoading}
                className="w-full"
              >
                {submitting || authLoading ? 'Signing in…' : 'Sign in'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Don’t have an account? <Link to="/register" className="ml-1 underline">Register</Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
