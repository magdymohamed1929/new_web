import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Sun, Moon, Menu, X, ChevronRight } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  isButton?: boolean;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact", isButton: true },
];

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);

      // Calculate scroll progress for the progress bar
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / scrollHeight;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full
        ${isScrolled
          ? "bg-background/80 backdrop-blur-md border-b py-3 shadow-sm"
          : "bg-transparent py-6"
        }`}
    >
      {/* Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary via-accent to-secondary"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center z-10">
          <a href="/" className="text-xl font-display font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Lovable<span className="text-foreground">Tech</span>
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) =>
            item.isButton ? (
              <Button
                key={item.label}
                asChild
                className="ml-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity animate-in fade-in slide-in-from-right"
                variant="default"
              >
                <a href={item.href}>{item.label}</a>
              </Button>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </a>
            )
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="ml-1"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
          
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[75vw] sm:w-[350px] pr-0">
              <div className="flex flex-col justify-between h-full pb-8">
                <div className="flex flex-col gap-6 mt-8">
                  {navItems.map((item, i) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center justify-between group pr-6 text-lg font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{ 
                        animationDelay: `${i * 0.05 + 0.1}s`,
                      }}
                    >
                      <span className="animate-in slide-in-from-right duration-300">{item.label}</span>
                      <ChevronRight className="h-5 w-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </a>
                  ))}
                </div>

                <div className="mt-auto pt-8">
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-accent"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;