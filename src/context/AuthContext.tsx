import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount, QuizSessionSummary, StudentRosterRecord } from '../types';
import { CHARACTERS } from '../data/characters';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: UserAccount | null;
  isAuthenticated: boolean;
  isTeacher: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message: string }>;
  teacherLogin: (passcode: string) => { success: boolean; message: string };
  register: (email: string, pass: string, nickname: string) => Promise<{ success: boolean; message: string }>;
  loginGuest: () => void;
  logout: () => void;
  addCoins: (amount: number) => void;
  unlockCharacter: (characterId: string, price: number) => boolean;
  equipCharacter: (characterId: string) => void;
  saveSession: (session: QuizSessionSummary) => void;
  exportSyncCode: () => string;
  importSyncCode: (code: string) => { success: boolean; message: string };
  openAuthModal: () => void;
  closeAuthModal: () => void;
  isAuthModalOpen: boolean;
  // Teacher roster actions
  studentRoster: StudentRosterRecord[];
  awardStudentCoins: (studentId: string, amount: number, teacherCode: string) => Promise<{ success: boolean; message: string }>;
}

const DEFAULT_USER: UserAccount = {
  email: 'champion@kidscenter.com',
  nickname: 'Math Champion',
  role: 'student',
  coins: 450, // Welcome bonus
  unlockedCharacters: ['rookie-champ'],
  equippedCharacterId: 'rookie-champ',
  stats: {
    totalSolved: 15,
    totalCorrect: 14,
    totalCoinsEarned: 450,
    bestStreak: 8
  },
  history: []
};

// Simulated classroom students enrolled in the platform for the teacher
const INITIAL_STUDENTS: StudentRosterRecord[] = [
  {
    id: 'std-1',
    name: 'Omar Farouk',
    email: 'omar.f@kidscenter.com',
    grade: 'Grade 5 - Soroban Track',
    coins: 2450,
    totalSolved: 142,
    totalCorrect: 138,
    accuracy: 97,
    bestStreak: 24,
    equippedCharacterId: 'messi-10',
    lastActive: '10 mins ago'
  },
  {
    id: 'std-2',
    name: 'Youssef Ahmed',
    email: 'youssef.a@kidscenter.com',
    grade: 'Grade 6 - Speed Math',
    coins: 3800,
    totalSolved: 210,
    totalCorrect: 198,
    accuracy: 94,
    bestStreak: 32,
    equippedCharacterId: 'ronaldo-7',
    lastActive: '25 mins ago'
  },
  {
    id: 'std-3',
    name: 'Mariam Khaled',
    email: 'mariam.k@kidscenter.com',
    grade: 'Grade 4 - Mental Arithmetic',
    coins: 1650,
    totalSolved: 95,
    totalCorrect: 91,
    accuracy: 96,
    bestStreak: 18,
    equippedCharacterId: 'salah-11',
    lastActive: '1 hour ago'
  },
  {
    id: 'std-4',
    name: 'Adam Tarek',
    email: 'adam.t@kidscenter.com',
    grade: 'Grade 5 - Multiplication Masters',
    coins: 1200,
    totalSolved: 78,
    totalCorrect: 68,
    accuracy: 87,
    bestStreak: 12,
    equippedCharacterId: 'spider-hero',
    lastActive: '3 hours ago'
  },
  {
    id: 'std-5',
    name: 'Nour El-Din',
    email: 'nour.d@kidscenter.com',
    grade: 'Grade 6 - Olympiad Math',
    coins: 5200,
    totalSolved: 320,
    totalCorrect: 312,
    accuracy: 98,
    bestStreak: 45,
    equippedCharacterId: 'saiyan-goku',
    lastActive: 'Just now'
  },
  {
    id: 'std-6',
    name: 'Salma Hossam',
    email: 'salma.h@kidscenter.com',
    grade: 'Grade 4 - Mental Arithmetic',
    coins: 980,
    totalSolved: 55,
    totalCorrect: 47,
    accuracy: 85,
    bestStreak: 9,
    equippedCharacterId: 'rookie-champ',
    lastActive: 'Yesterday'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [studentRoster, setStudentRoster] = useState<StudentRosterRecord[]>(INITIAL_STUDENTS);

  // Restore the Supabase session and its cloud profile on every device.
  useEffect(() => {
    let mounted = true;
    const restore = async () => {
      if (!supabase) {
        const activeEmail = localStorage.getItem('kids_center_active_email');
        const stored = activeEmail ? localStorage.getItem(`kids_center_user_${activeEmail}`) : null;
        if (mounted && stored) { try { setUser(JSON.parse(stored)); } catch { setUser(null); } }
        return;
      }
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted || !session?.user) { if (mounted) setUser(null); return; }
      await loadCloudUser(session.user.id, session.user.email || '');
    };
    const loadCloudUser = async (id: string, email: string) => {
      if (!supabase) return;
      const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', id).maybeSingle();
      if (error) { console.error('Could not load Supabase profile:', error.message); return; }
      if (!profile || !mounted) return;
      const { data: characterRows } = await supabase.from('user_characters').select('character_id').eq('user_id', id);
      const { data: sessions } = await supabase.from('quiz_sessions').select('*').eq('user_id', id).order('created_at', { ascending: false }).limit(20);
      const history: QuizSessionSummary[] = (sessions || []).map((row: any) => ({
        id: row.id, date: row.created_at, categoryTitle: row.category_title || 'Math Practice',
        totalQuestions: Number(row.total_questions || 0), correctAnswers: Number(row.correct_answers || 0),
        accuracy: Number(row.accuracy || 0), coinsEarned: Number(row.coins_earned || 0),
        timeSpentSeconds: Number(row.time_spent_seconds || 0),
        averageTimePerQuestion: row.total_questions ? Number(row.time_spent_seconds || 0) / Number(row.total_questions) : 0,
        problems: []
      }));
      const next: UserAccount = {
        email: profile.email || email,
        nickname: profile.nickname || email.split('@')[0],
        role: profile.role === 'teacher' ? 'teacher' : 'student',
        coins: Number(profile.coins ?? 450),
        unlockedCharacters: Array.from(new Set(['rookie-champ', ...(characterRows || []).map((row: any) => row.character_id).filter(Boolean)])),
        equippedCharacterId: profile.equipped_character_id || 'rookie-champ',
        stats: {
          totalSolved: Number(profile.total_solved ?? 0),
          totalCorrect: Number(profile.total_correct ?? 0),
          totalCoinsEarned: Number(profile.coins ?? 450),
          bestStreak: Number(profile.best_streak ?? 0)
        },
        history
      };
      setUser(next);
      try { localStorage.setItem(`kids_center_user_${next.email}`, JSON.stringify(next)); localStorage.setItem('kids_center_active_email', next.email); } catch {}
      if (next.role === 'student') {
        const { data: roster } = await supabase.from('profiles').select('id,email,nickname,grade_track,coins,total_solved,total_correct,best_streak,equipped_character_id,updated_at').eq('role','student').order('updated_at',{ascending:false}).limit(200);
        if (mounted && roster) setStudentRoster(roster.map((row: any) => ({ id: row.id, email: row.email, name: row.nickname || row.email, grade: row.grade_track || 'Student', coins: Number(row.coins || 0), totalSolved: Number(row.total_solved || 0), totalCorrect: Number(row.total_correct || 0), accuracy: row.total_solved ? Math.round(row.total_correct / row.total_solved * 100) : 100, bestStreak: Number(row.best_streak || 0), equippedCharacterId: row.equipped_character_id || 'rookie-champ', lastActive: row.updated_at ? new Date(row.updated_at).toLocaleString() : 'Recently' })));
      }
    };
    restore();
    const subscription = supabase?.auth.onAuthStateChange((_event, session) => {
      if (!session?.user && mounted) setUser(null);
    }).data.subscription;
    return () => { mounted = false; subscription?.unsubscribe(); };
  }, []);

  const saveUser = (updated: UserAccount) => {
    setUser(updated);
    try {
      localStorage.setItem(`kids_center_user_${updated.email}`, JSON.stringify(updated));
      localStorage.setItem('kids_center_active_email', updated.email);
    } catch {}
    if (supabase && updated.email !== DEFAULT_USER.email && updated.role !== 'teacher') {
      void (async () => {
        const { data: { user: authUser } } = await supabase!.auth.getUser();
        if (!authUser) return;
        const { error } = await supabase!.from('profiles').upsert({
          id: authUser.id, email: updated.email, nickname: updated.nickname, role: updated.role,
          coins: updated.coins, total_solved: updated.stats.totalSolved, total_correct: updated.stats.totalCorrect,
          best_streak: updated.stats.bestStreak,
          equipped_character_id: updated.equippedCharacterId, updated_at: new Date().toISOString()
        }, { onConflict: 'id' });
        if (error) console.error('Could not save profile to Supabase:', error.message);
      })();
    }
    if (updated.role === 'student') {
      setStudentRoster(prev => {
        const record: StudentRosterRecord = {
          id: `local-${updated.email}`, name: updated.nickname, email: updated.email, grade: 'Student',
          coins: updated.coins, totalSolved: updated.stats.totalSolved, totalCorrect: updated.stats.totalCorrect,
          accuracy: updated.stats.totalSolved ? Math.round(updated.stats.totalCorrect / updated.stats.totalSolved * 100) : 100,
          bestStreak: updated.stats.bestStreak, equippedCharacterId: updated.equippedCharacterId, lastActive: 'Just now'
        };
        const next = prev.some(item => item.email === updated.email)
          ? prev.map(item => item.email === updated.email ? { ...item, ...record } : item)
          : [record, ...prev];
        try { localStorage.setItem('kids_center_roster', JSON.stringify(next)); } catch {}
        return next;
      });
    }
  };

  const login = async (email: string, pass: string): Promise<{ success: boolean; message: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !pass) return { success: false, message: 'Please enter both email and password.' };
    if (!supabase) return { success: false, message: 'Supabase is not configured. Check VITE_SUPABASE_URL and the public key in Vercel.' };
    const { data, error } = await supabase.auth.signInWithPassword({ email: cleanEmail, password: pass });
    if (error || !data.user) {
      const authMessage = error?.message || 'Login failed.';
      const lowerMessage = authMessage.toLowerCase();
      if (lowerMessage.includes('email not confirmed')) {
        return { success: false, message: 'This account needs email confirmation. To allow direct sign-in, the project owner must turn off Confirm email in Supabase Authentication settings.' };
      }
      if (lowerMessage.includes('invalid login credentials')) {
        return { success: false, message: 'Email or password is incorrect, or this account has not been created in Supabase.' };
      }
      return { success: false, message: authMessage };
    }
    const { data: profile, error: profileError } = await supabase.from('profiles').select('*').eq('id', data.user.id).maybeSingle();
    if (profileError) return { success: false, message: 'Signed in, but could not load profile: ' + profileError.message };
    if (!profile) return { success: false, message: 'Account profile is missing. Check the profiles table and handle_new_user trigger.' };
    const { data: characters } = await supabase.from('user_characters').select('character_id').eq('user_id', data.user.id);
    const { data: sessions } = await supabase.from('quiz_sessions').select('*').eq('user_id', data.user.id).order('created_at', { ascending: false }).limit(20);
    const history: QuizSessionSummary[] = (sessions || []).map((row: any) => row.session_data || row.summary || row).filter((row: any) => row && row.id && row.problems);
    const account: UserAccount = {
      email: profile.email || cleanEmail, nickname: profile.nickname || cleanEmail.split('@')[0],
      role: profile.role === 'teacher' ? 'teacher' : 'student', coins: Number(profile.coins ?? 450),
      unlockedCharacters: Array.from(new Set(['rookie-champ', ...(characters || []).map((row: any) => row.character_id).filter(Boolean)])),
      equippedCharacterId: profile.equipped_character_id || 'rookie-champ',
      stats: { totalSolved: Number(profile.total_solved || 0), totalCorrect: Number(profile.total_correct || 0), totalCoinsEarned: Number(profile.total_coins_earned ?? profile.coins ?? 450), bestStreak: Number(profile.best_streak || 0) },
      history
    };
    saveUser(account);
    setIsAuthModalOpen(false);
    return { success: true, message: `Welcome back, ${account.nickname}!` };
  };

  const teacherLogin = (passcode: string): { success: boolean; message: string } => {
    const cleanCode = passcode.trim();
    if (cleanCode === '01068545095' || cleanCode === '1234') {
      const teacherProfile: UserAccount = {
        email: 'teacher@kidscenter.com',
        nickname: 'Coach Ahmed (Teacher)',
        role: 'teacher',
        coins: 99999,
        unlockedCharacters: CHARACTERS.map(c => c.id),
        equippedCharacterId: 'messi-10',
        stats: {
          totalSolved: 999,
          totalCorrect: 999,
          totalCoinsEarned: 99999,
          bestStreak: 100
        },
        history: []
      };
      saveUser(teacherProfile);
      setIsAuthModalOpen(false);
      return { success: true, message: 'Teacher Portal Access Granted!' };
    }
    return { success: false, message: 'Incorrect teacher passcode!' };
  };

  const register = async (email: string, pass: string, nickname: string): Promise<{ success: boolean; message: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) return { success: false, message: 'Please enter a valid email address.' };
    if (!pass || pass.length < 6) return { success: false, message: 'Password must be at least 6 characters.' };
    if (!supabase) return { success: false, message: 'Supabase is not configured. Check Vercel environment variables.' };
    const cleanNickname = nickname.trim() || cleanEmail.split('@')[0];
    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail, password: pass, options: { data: { nickname: cleanNickname, role: 'student' } }
    });
    if (error) return { success: false, message: error.message };
    if (!data.user) return { success: false, message: 'Registration could not be completed.' };
    // Supabase returns no session when email confirmation is enabled. Do not
    // pretend the student is signed in; direct registration requires Confirm email
    // to be disabled in the Supabase project Auth settings.
    if (!data.session) return {
      success: false,
      message: 'Supabase is still requiring email confirmation. Turn off Authentication → Sign In / Providers → Email → Confirm email in the Supabase dashboard, then try again.'
    };
    const { data: profile, error: profileError } = await supabase.from('profiles').select('*').eq('id', data.user.id).maybeSingle();
    if (profileError) return { success: false, message: 'Account created but profile could not be loaded: ' + profileError.message };
    if (!profile) return { success: false, message: 'Account created. The profiles table/handle_new_user trigger must create the student profile before login.' };
    const account: UserAccount = {
      email: cleanEmail, nickname: profile.nickname || cleanNickname, role: 'student', coins: Number(profile.coins ?? 450),
      unlockedCharacters: ['rookie-champ'], equippedCharacterId: profile.equipped_character_id || 'rookie-champ',
      stats: { totalSolved: Number(profile.total_solved || 0), totalCorrect: Number(profile.total_correct || 0), totalCoinsEarned: Number(profile.coins ?? 450), bestStreak: Number(profile.best_streak || 0) }, history: []
    };
    saveUser(account);
    setIsAuthModalOpen(false);
    return { success: true, message: `Welcome, ${account.nickname}!` };
  };

  const loginGuest = () => {
    saveUser(DEFAULT_USER);
    localStorage.setItem('kids_center_passed_gate', 'true');
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    if (supabase) void supabase.auth.signOut();
    localStorage.removeItem('kids_center_active_email');
    localStorage.removeItem('kids_center_passed_gate');
    setUser(null);
    setIsAuthModalOpen(false);
  };

  const addCoins = (amount: number) => {
    if (!user) return;
    saveUser({
      ...user,
      coins: Math.max(0, user.coins + amount),
      stats: {
        ...user.stats,
        totalCoinsEarned: amount > 0 ? user.stats.totalCoinsEarned + amount : user.stats.totalCoinsEarned
      }
    });
  };

  const unlockCharacter = (characterId: string, price: number): boolean => {
    if (!user) return false;
    if (user.unlockedCharacters.includes(characterId)) return true;
    if (user.coins < price) return false;

    saveUser({
      ...user,
      coins: user.coins - price,
      unlockedCharacters: [...user.unlockedCharacters, characterId],
      equippedCharacterId: characterId
    });
    return true;
  };

  const equipCharacter = (characterId: string) => {
    if (!user) return;
    if (!user.unlockedCharacters.includes(characterId)) return;
    saveUser({
      ...user,
      equippedCharacterId: characterId
    });
  };

  const saveSession = (session: QuizSessionSummary) => {
    if (!user) return;
    if (supabase && user.email !== DEFAULT_USER.email) {
      void (async () => {
        const { data: { user: authUser } } = await supabase!.auth.getUser();
        if (authUser) {
          const { error } = await supabase!.from('quiz_sessions').insert({
            user_id: authUser.id, category_title: session.categoryTitle, total_questions: session.totalQuestions,
            correct_answers: session.correctAnswers, accuracy: session.accuracy, coins_earned: session.coinsEarned,
            time_spent_seconds: session.timeSpentSeconds, created_at: session.date || new Date().toISOString()
          });
          if (error) console.error('Could not save quiz session:', error.message);
        }
      })();
    }
    saveUser({
      ...user,
      coins: user.coins + session.coinsEarned,
      stats: {
        totalSolved: user.stats.totalSolved + session.totalQuestions,
        totalCorrect: user.stats.totalCorrect + session.correctAnswers,
        totalCoinsEarned: user.stats.totalCoinsEarned + session.coinsEarned,
        bestStreak: Math.max(user.stats.bestStreak, session.correctAnswers)
      },
      history: [session, ...user.history.slice(0, 19)]
    });
  };

  const exportSyncCode = (): string => {
    if (!user) return '';
    try {
      return btoa(encodeURIComponent(JSON.stringify(user)));
    } catch {
      return '';
    }
  };

  const importSyncCode = (code: string): { success: boolean; message: string } => {
    try {
      const decoded = decodeURIComponent(atob(code.trim()));
      const parsed: UserAccount = JSON.parse(decoded);
      if (!parsed.email) return { success: false, message: 'Invalid code.' };
      saveUser(parsed);
      return { success: true, message: `Loaded profile: ${parsed.nickname}` };
    } catch {
      return { success: false, message: 'Invalid code format.' };
    }
  };

  const awardStudentCoins = async (studentId: string, amount: number, teacherCode: string): Promise<{ success: boolean; message: string }> => {
    if (!supabase) return { success: false, message: 'Supabase is not configured.' };
    const { data, error } = await supabase.functions.invoke('award-student-coins', {
      body: { teacherCode, studentId }
    });
    if (error || !data?.success) {
      console.error('Could not award student coins:', error || data);
      return { success: false, message: data?.error || error?.message || 'Could not award coins.' };
    }
    setStudentRoster(prev => {
      const updated = prev.map(s => s.id === studentId ? { ...s, coins: Number(data.coins) } : s);
      try { localStorage.setItem('kids_center_roster', JSON.stringify(updated)); } catch {}
      return updated;
    });
    return { success: true, message: `Added ${data.awarded} coins. New balance: ${data.coins}.` };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user && user.email !== DEFAULT_USER.email,
        isTeacher: user?.role === 'teacher',
        login,
        teacherLogin,
        register,
        loginGuest,
        logout,
        addCoins,
        unlockCharacter,
        equipCharacter,
        saveSession,
        exportSyncCode,
        importSyncCode,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        isAuthModalOpen,
        studentRoster,
        awardStudentCoins
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
