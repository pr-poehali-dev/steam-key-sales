import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Game {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  category: string;
  image: string;
  rating: number;
}

const games: Game[] = [
  { id: 1, title: 'Cyberpunk 2077', price: 1299, oldPrice: 2499, discount: 48, category: 'RPG', image: '/placeholder.svg', rating: 4.5 },
  { id: 2, title: 'Elden Ring', price: 1899, oldPrice: 2999, discount: 37, category: 'Action', image: '/placeholder.svg', rating: 4.9 },
  { id: 3, title: 'Red Dead Redemption 2', price: 1699, category: 'Action', image: '/placeholder.svg', rating: 4.8 },
  { id: 4, title: 'Baldurs Gate 3', price: 2299, oldPrice: 2699, discount: 15, category: 'RPG', image: '/placeholder.svg', rating: 4.9 },
  { id: 5, title: 'Hogwarts Legacy', price: 1999, category: 'RPG', image: '/placeholder.svg', rating: 4.6 },
  { id: 6, title: 'GTA V', price: 899, oldPrice: 1499, discount: 40, category: 'Action', image: '/placeholder.svg', rating: 4.7 },
];

export default function Index() {
  const [cart, setCart] = useState<Game[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const addToCart = (game: Game) => {
    setCart([...cart, game]);
  };

  const removeFromCart = (gameId: number) => {
    setCart(cart.filter(item => item.id !== gameId));
  };

  const totalPrice = cart.reduce((sum, game) => sum + game.price, 0);

  const filteredGames = selectedCategory === 'all' 
    ? games 
    : games.filter(game => game.category.toLowerCase() === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Gamepad2" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold neon-text">M3TA SHOP</h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#catalog" className="text-muted-foreground hover:text-foreground transition-colors">Каталог</a>
              <a href="#sales" className="text-muted-foreground hover:text-foreground transition-colors">Акции</a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">О нас</a>
              <a href="#contacts" className="text-muted-foreground hover:text-foreground transition-colors">Контакты</a>
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-secondary">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map((game, index) => (
                        <div key={`${game.id}-${index}`} className="flex items-center justify-between p-3 bg-card rounded-lg">
                          <div>
                            <p className="font-medium">{game.title}</p>
                            <p className="text-sm text-primary">{game.price} ₽</p>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeFromCart(game.id)}>
                            <Icon name="Trash2" size={18} />
                          </Button>
                        </div>
                      ))}
                      <div className="border-t border-border pt-4">
                        <div className="flex justify-between text-lg font-bold mb-4">
                          <span>Итого:</span>
                          <span className="text-primary">{totalPrice} ₽</span>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                          <Icon name="Mail" className="mr-2" size={18} />
                          Оформить заказ
                        </Button>
                        <p className="text-xs text-muted-foreground text-center mt-2">
                          Ключи будут отправлены на email мгновенно
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold neon-text animate-fade-in">
              M3TA SHOP
            </h2>
            <p className="text-xl text-muted-foreground">
              Мгновенная доставка на email • Лучшие цены • Гарантия подлинности
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg">
                <Icon name="Zap" className="text-accent" size={20} />
                <span className="text-sm">Моментальная доставка</span>
              </div>
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg">
                <Icon name="Shield" className="text-primary" size={20} />
                <span className="text-sm">100% гарантия</span>
              </div>
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg">
                <Icon name="CreditCard" className="text-secondary" size={20} />
                <span className="text-sm">Безопасная оплата</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="sales" className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold flex items-center gap-3">
              <Icon name="Flame" className="text-secondary" size={32} />
              Горящие акции
            </h3>
            <Badge variant="destructive" className="text-sm px-3 py-1 animate-pulse-glow">
              <Icon name="Clock" className="mr-1" size={14} />
              До конца акции: 23:45:12
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.filter(g => g.discount).slice(0, 3).map(game => (
              <Card key={game.id} className="overflow-hidden glow-card border-primary/20">
                <div className="relative">
                  <img src={game.image} alt={game.title} className="w-full h-48 object-cover" />
                  <Badge className="absolute top-3 right-3 bg-destructive text-white text-lg font-bold">
                    -{game.discount}%
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-lg">{game.title}</h4>
                      <Badge variant="outline" className="mt-2">{game.category}</Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Star" className="text-accent fill-accent" size={16} />
                      <span className="text-sm font-medium">{game.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="flex items-center justify-between">
                  <div className="flex flex-col">
                    {game.oldPrice && (
                      <span className="text-sm text-muted-foreground line-through">{game.oldPrice} ₽</span>
                    )}
                    <span className="text-2xl font-bold text-primary">{game.price} ₽</span>
                  </div>
                  <Button onClick={() => addToCart(game)} className="bg-gradient-to-r from-primary to-secondary">
                    <Icon name="ShoppingCart" className="mr-2" size={18} />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8">Каталог игр</h3>
          
          <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
            <TabsList className="mb-8">
              <TabsTrigger value="all">Все игры</TabsTrigger>
              <TabsTrigger value="rpg">RPG</TabsTrigger>
              <TabsTrigger value="action">Action</TabsTrigger>
            </TabsList>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map(game => (
                <Card key={game.id} className="overflow-hidden glow-card">
                  <div className="relative">
                    <img src={game.image} alt={game.title} className="w-full h-48 object-cover" />
                    {game.discount && (
                      <Badge className="absolute top-3 right-3 bg-destructive">-{game.discount}%</Badge>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-lg">{game.title}</h4>
                        <Badge variant="outline" className="mt-2">{game.category}</Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Star" className="text-accent fill-accent" size={16} />
                        <span className="text-sm font-medium">{game.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="flex items-center justify-between">
                    <div className="flex flex-col">
                      {game.oldPrice && (
                        <span className="text-sm text-muted-foreground line-through">{game.oldPrice} ₽</span>
                      )}
                      <span className="text-2xl font-bold text-primary">{game.price} ₽</span>
                    </div>
                    <Button onClick={() => addToCart(game)} variant="outline">
                      <Icon name="ShoppingCart" className="mr-2" size={18} />
                      Купить
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </Tabs>
        </div>
      </section>

      <section id="about" className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h3 className="text-3xl font-bold">О магазине</h3>
            <p className="text-lg text-muted-foreground">
              M3TA SHOP — надежный магазин цифровых ключей для Steam. Мы работаем с 2020 года 
              и доставили более 100,000 ключей игрокам по всему миру.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card className="p-6">
                <Icon name="Zap" className="text-accent mx-auto mb-4" size={40} />
                <h4 className="font-bold mb-2">Мгновенная доставка</h4>
                <p className="text-sm text-muted-foreground">
                  Ключ приходит на email сразу после оплаты
                </p>
              </Card>
              <Card className="p-6">
                <Icon name="ShieldCheck" className="text-primary mx-auto mb-4" size={40} />
                <h4 className="font-bold mb-2">Гарантия качества</h4>
                <p className="text-sm text-muted-foreground">
                  Все ключи официальные и проверенные
                </p>
              </Card>
              <Card className="p-6">
                <Icon name="Headphones" className="text-secondary mx-auto mb-4" size={40} />
                <h4 className="font-bold mb-2">Поддержка 24/7</h4>
                <p className="text-sm text-muted-foreground">
                  Всегда готовы помочь с любым вопросом
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-center">Контакты</h3>
            <Card className="p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Icon name="Mail" className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">support@metashop.ru</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                    <Icon name="MessageCircle" className="text-accent" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telegram</p>
                    <p className="font-medium">@metashop_support</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <Icon name="Clock" className="text-secondary" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Режим работы</p>
                    <p className="font-medium">24/7 без выходных</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Gamepad2" className="text-white" size={20} />
              </div>
              <span className="font-bold">M3TA SHOP © 2024</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Все цены указаны в рублях. Мгновенная доставка на email.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}