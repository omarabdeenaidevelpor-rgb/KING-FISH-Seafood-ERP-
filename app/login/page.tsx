'use client'

import { FormEvent, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Eye, EyeOff, LockKeyhole, UserRound } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (username.trim() === 'admin' && password === 'admin123') {
      sessionStorage.setItem('king-fish-user', JSON.stringify({ username: 'admin', name: 'مدير النظام', role: 'مدير النظام' }))
      router.push('/')
      return
    }
    setError('اسم المستخدم أو كلمة المرور غير صحيحة')
  }

  return (
    <main className="login-page" dir="rtl">
      <div className="login-backdrop" aria-hidden="true" />
      <section className="login-card" aria-labelledby="login-title">
        <div className="login-brand"><Image src="/king-fish-logo.png" alt="شعار KING FISH Seafood ERP" width={190} height={190} priority /></div>
        <div className="login-heading"><span>مرحباً بعودتك</span><h1 id="login-title">تسجيل الدخول</h1><p>أدخل بيانات مدير النظام للوصول إلى مساحة العمل</p></div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">اسم المستخدم</label>
          <div className="login-input-wrap"><UserRound aria-hidden="true" /><input id="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="admin" autoComplete="username" required /></div>
          <label htmlFor="password">كلمة المرور</label>
          <div className="login-input-wrap"><LockKeyhole aria-hidden="true" /><input id="password" value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? 'text' : 'password'} placeholder="أدخل كلمة المرور" autoComplete="current-password" required /><button type="button" className="password-toggle" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}>{showPassword ? <EyeOff /> : <Eye />}</button></div>
          {error && <p className="login-error" role="alert">{error}</p>}
          <button className="login-submit" type="submit">دخول إلى لوحة المدير <ArrowLeft /></button>
        </form>
        <p className="login-hint">بيانات الدخول الأولية: <strong>admin</strong> / <strong>admin123</strong></p>
        <p className="login-footer">نظام إدارة عمليات الأغذية البحرية <span>•</span> إصدار 2026</p>
      </section>
    </main>
  )
}
