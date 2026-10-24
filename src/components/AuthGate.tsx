import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { sounds } from '../utils/audio';
import { Lock, Mail, User, ShieldCheck, ArrowRight, Zap, GraduationCap } from 'lucide-react';

interface AuthGateProps {
  onSuccess: () => void;
}

export const AuthGate: React.FC<AuthGateProps> = ({ onSuccess }) => {
  const { login, register, teacherLogin, loginGuest } = useAuth();

  const [authMode, setAuthMode] = useState<'login' | 'register' | 'teacher'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [teacherPasscode, setTeacherPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playKeyClick();
    setErrorMsg('');
    const res = await login(email, password);
    if (!res.success) {
      setErrorMsg(res.message);
      sounds.playWrong();
    } else {
      setSuccessMsg(res.message);
      sounds.playCorrect();
      setTimeout(onSuccess, 600);
    }
  };

  const handleStudentRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playKeyClick();
    setErrorMsg('');
    const res = await register(email, password, nickname);
    if (!res.success) {
      setErrorMsg(res.message);
      sounds.playWrong();
    } else {
      setSuccessMsg(res.message);
      sounds.playCorrect();
      setTimeout(onSuccess, 600);
    }
  };

  const handleTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playKeyClick();
    setErrorMsg('');
    const res = teacherLogin(teacherPasscode);
    if (!res.success) {
      setErrorMsg(res.message);
      sounds.playWrong();
    } else {
      setSuccessMsg('Teacher Portal Access Granted!');
      sounds.playUnlock();
      setTimeout(onSuccess, 600);
    }
  };

  const handleGuestQuickStart = () => {
    sounds.playKeyClick();
    loginGuest();
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/80 flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-white border-3 border-neutral-900 rounded-3xl shadow-[0_12px_0_0_#171717] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 my-8">
        {/* Header Banner */}
        <div className="px-6 py-6 bg-amber-400 border-b-2 border-neutral-900 text-center relative">
          <div className="w-14 h-14 rounded-2xl bg-white border-2 border-neutral-900 shadow-[0_3px_0_0_#171717] flex items-center justify-center text-3xl mx-auto mb-2">
            ⚡
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight leading-none">
            Kids Center Pro Games
          </h1>
          <p className="text-xs font-bold text-neutral-800 uppercase tracking-widest mt-1">
            Mental Arithmetic & 3D Roblox Esports
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b-2 border-neutral-900 bg-neutral-100 text-xs font-black">
          <button
            type="button"
            onClick={() => {
              sounds.playKeyClick();
              setAuthMode('login');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-3 text-center border-r-2 border-neutral-900 transition-colors cursor-pointer ${
              authMode === 'login' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Student Login
          </button>
          <button
            type="button"
            onClick={() => {
              sounds.playKeyClick();
              setAuthMode('register');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-3 text-center border-r-2 border-neutral-900 transition-colors cursor-pointer ${
              authMode === 'register' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={() => {
              sounds.playKeyClick();
              setAuthMode('teacher');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              authMode === 'teacher' ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            👨‍🏫 Teacher Access
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-4">
          {errorMsg && (
            <div className="p-3 bg-rose-100 border-2 border-neutral-900 rounded-xl text-xs font-black text-rose-900">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-100 border-2 border-neutral-900 rounded-xl text-xs font-black text-emerald-900">
              {successMsg}
            </div>
          )}

          {/* 1. Student Login */}
          {authMode === 'login' && (
            <form onSubmit={handleStudentLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase text-neutral-700 mb-1">
                  Email Address:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@kidscenter.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-neutral-50 border-2 border-neutral-900 rounded-xl font-bold text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-neutral-700 mb-1">
                  Password:
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-neutral-50 border-2 border-neutral-900 rounded-xl font-bold text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 border-2 border-neutral-900 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider text-neutral-900 shadow-[0_4px_0_0_#171717] active:translate-y-0.5 cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                <span>Enter & Load My Coins</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* 2. Create Account */}
          {authMode === 'register' && (
            <form onSubmit={handleStudentRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-black uppercase text-neutral-700 mb-1">
                  Hero Nickname:
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="e.g. Leo The Prodigy"
                    className="w-full pl-9 pr-3 py-2 bg-neutral-50 border-2 border-neutral-900 rounded-xl font-bold text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-neutral-700 mb-1">
                  Email Address:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@kidscenter.com"
                    className="w-full pl-9 pr-3 py-2 bg-neutral-50 border-2 border-neutral-900 rounded-xl font-bold text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-neutral-700 mb-1">
                  Create Password (min 4 chars):
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 bg-neutral-50 border-2 border-neutral-900 rounded-xl font-bold text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-400 hover:bg-emerald-500 border-2 border-neutral-900 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider text-neutral-900 shadow-[0_4px_0_0_#171717] active:translate-y-0.5 cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                <span>Register & Get 450 Free Coins 🪙</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* 3. Teacher Access (Secret passcode with password masking, no leaks!) */}
          {authMode === 'teacher' && (
            <form onSubmit={handleTeacherSubmit} className="space-y-4">
              <div className="p-3 bg-neutral-900 text-white rounded-xl text-xs font-bold flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-amber-400" />
                <span>Coach & Teacher Authentication Only</span>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-neutral-700 mb-1">
                  Private Teacher Passcode:
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                  <input
                    type="password"
                    required
                    value={teacherPasscode}
                    onChange={(e) => setTeacherPasscode(e.target.value)}
                    placeholder="Enter teacher passcode"
                    className="w-full pl-9 pr-3 py-2.5 bg-neutral-50 border-2 border-neutral-900 rounded-xl font-mono font-bold text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white border-2 border-neutral-900 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_4px_0_0_#171717] active:translate-y-0.5 cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                <span>Open Teacher Roster & Analytics →</span>
              </button>
            </form>
          )}

          {/* Guest Play Divider */}
          <div className="pt-3 border-t border-neutral-200 text-center">
            <button
              type="button"
              onClick={handleGuestQuickStart}
              className="text-xs font-black text-neutral-600 hover:text-neutral-900 underline cursor-pointer"
            >
              Continue as Guest (Preview without signing in) →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
