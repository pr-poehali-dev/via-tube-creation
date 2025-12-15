import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Sidebar = () => {
  const menuItems = [
    { icon: 'Home', label: 'Главная', active: true },
    { icon: 'Compass', label: 'Навигатор' },
    { icon: 'PlaySquare', label: 'Подписки' },
  ];

  const libraryItems = [
    { icon: 'Clock', label: 'История' },
    { icon: 'ListVideo', label: 'Плейлисты' },
    { icon: 'Heart', label: 'Понравившиеся' },
    { icon: 'Bookmark', label: 'Закладки' },
  ];

  const subscriptions = [
    { name: 'DesignHub', avatar: '🎨' },
    { name: 'TechArt', avatar: '🤖' },
    { name: 'SpaceExplorer', avatar: '🚀' },
    { name: 'BeatMakers', avatar: '🎵' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border/50 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center neon-glow animate-glow">
            <Icon name="Play" size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">ViaTube</h1>
        </div>

        <nav className="space-y-2 mb-6">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "default" : "ghost"}
              className={`w-full justify-start gap-3 h-11 ${
                item.active 
                  ? 'bg-gradient-to-r from-primary to-secondary neon-glow' 
                  : 'hover:bg-accent'
              }`}
            >
              <Icon name={item.icon} size={20} />
              <span className="font-medium">{item.label}</span>
            </Button>
          ))}
        </nav>

        <Separator className="my-4" />

        <div className="mb-6">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
            Библиотека
          </h3>
          <nav className="space-y-2">
            {libraryItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start gap-3 h-11 hover:bg-accent"
              >
                <Icon name={item.icon} size={20} />
                <span className="font-medium">{item.label}</span>
              </Button>
            ))}
          </nav>
        </div>

        <Separator className="my-4" />

        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
            Подписки
          </h3>
          <nav className="space-y-1">
            {subscriptions.map((sub) => (
              <Button
                key={sub.name}
                variant="ghost"
                className="w-full justify-start gap-3 h-11 hover:bg-accent"
              >
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-lg">
                  {sub.avatar}
                </div>
                <span className="font-medium truncate">{sub.name}</span>
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
