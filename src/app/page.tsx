import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('https://placehold.co/1920x1080.png')"}} data-ai-hint="farm landscape">
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm"></div>
      <div className="relative z-10 w-full px-4">
        <LoginForm />
      </div>
    </main>
  );
}
