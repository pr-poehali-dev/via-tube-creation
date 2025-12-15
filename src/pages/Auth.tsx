import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin) {
      navigate('/create-channel');
    } else {
      const existingUser = localStorage.getItem('viatube_user');
      if (existingUser) {
        navigate('/');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="h-16 w-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center neon-glow animate-glow">
              <Icon name="Play" size={36} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">ViaTube</h1>
          </div>
        </div>

        <Card className="p-8 bg-card/50 border-border/50 backdrop-blur-xl animate-scale-in">
          <div className="mb-6">
            <h2 className="text-2xl font-bold gradient-text mb-2">
              {isLogin ? 'Вход в аккаунт' : 'Регистрация'}
            </h2>
            <p className="text-muted-foreground">
              {isLogin 
                ? 'Войдите, чтобы продолжить' 
                : 'Создайте аккаунт и станьте частью ViaTube'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background/50 border-border/50 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background/50 border-border/50 focus:border-primary"
              />
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <Button variant="link" size="sm" className="text-primary">
                  Забыли пароль?
                </Button>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-secondary neon-glow h-12 text-base font-semibold"
            >
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
              <Button
                variant="link"
                className="text-primary ml-1"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Зарегистрироваться' : 'Войти'}
              </Button>
            </p>
          </div>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">или продолжить с</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="outline" className="gap-2">
              <Icon name="Mail" size={18} />
              Google
            </Button>
            <Button variant="outline" className="gap-2">
              <Icon name="Github" size={18} />
              GitHub
            </Button>
          </div>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Регистрируясь, вы принимаете наши{' '}
          <Button variant="link" size="sm" className="text-primary p-0 h-auto">
            Условия использования
          </Button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
