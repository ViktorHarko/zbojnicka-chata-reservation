import React, { useState } from 'react';
import { useI18n } from '../i18n';
import { ChevronLeft, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useI18n();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    surname: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login:', { email: formData.email, password: formData.password });
      alert(t('login_success'));
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert(t('password_mismatch'));
        return;
      }
      console.log('Register:', formData);
      alert(t('register_success'));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-beige font-sans">
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <button 
            onClick={() => window.location.hash = '#/res'}
            className="flex items-center gap-2 text-primary font-bold mb-8 hover:opacity-70 transition-opacity"
          >
            <ChevronLeft size={20} /> {t('back')}
          </button>

          {/* Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-4 border-primary">
            {/* Title */}
            <h1 className="text-3xl font-bold text-primary mb-2 text-center">
              {isLogin ? t('login') : t('register')}
            </h1>
            <p className="text-center text-gray-600 mb-8">
              {isLogin 
                ? t('login_desc')
                : t('register_desc')
              }
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Registration only: Name */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">{t('name')}</label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t('name_placeholder')}
                      required
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Registration only: Surname */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">{t('surname')}</label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="text"
                      name="surname"
                      value={formData.surname}
                      onChange={handleInputChange}
                      placeholder={t('surname_placeholder')}
                      required
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-primary mb-2">Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                    required
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-bold text-primary mb-2">{t('password')}</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder={t('password_min')}
                    required
                    minLength={6}
                    className="w-full pl-10 pr-10 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Registration only: Confirm Password */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">{t('confirm_password')}</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder={t('confirm_password_placeholder')}
                      required
                      minLength={6}
                      className="w-full pl-10 pr-10 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-teal-900 transition-colors text-lg mt-8"
              >
                {isLogin ? t('login_btn') : t('register_btn')}
              </button>
            </form>

            {/* Toggle Link */}
            <p className="text-center text-gray-600 mt-6">
              {isLogin ? t('no_account') : t('have_account')}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({
                    email: '',
                    password: '',
                    name: '',
                    surname: '',
                    confirmPassword: ''
                  });
                }}
                className="text-primary font-bold hover:underline"
              >
                {isLogin ? t('register') : t('login')}
              </button>
            </p>
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-primary text-white p-6 rounded-xl text-sm leading-relaxed">
            <p className="font-bold mb-2">ℹ️ {t('info_title')}</p>
            <p>{t('info_desc')}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;
