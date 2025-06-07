
import ArtworkCard from '@/components/ArtworkCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const featuredArtworks = [
    {
      id: '1',
      title: 'Sunset Dreams',
      artist: 'Your Name',
      price: 2500,
      image: '/placeholder.svg',
      likes: 42,
      views: 156
    },
    {
      id: '2',
      title: 'Urban Reflections',
      artist: 'Your Name',
      price: 1800,
      image: '/placeholder.svg',
      likes: 38,
      views: 203
    },
    {
      id: '3',
      title: 'Abstract Symphony',
      artist: 'Your Name',
      price: 3200,
      image: '/placeholder.svg',
      likes: 67,
      views: 298
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gallery-cream to-white">
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-display text-6xl md:text-8xl font-bold text-gallery-dark mb-6 animate-fade-in">
            Artist
            <span className="block text-gallery-gold">Portfolio</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore my creative journey through original artworks and commissioned pieces
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-3">
              <Link to="/store">
                View My Work <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              <Link to="/contact">Commission a Piece</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Recent Work
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A selection of my latest pieces
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} {...artwork} />
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/store">
                View All Work <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gallery-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                About My Art
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                I create original artworks that explore the intersection of color, emotion, 
                and human experience. Each piece tells a story and invites viewers to discover 
                their own meaning within the composition.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Available for commissioned work and open to collaborating on unique projects 
                that bring your vision to life.
              </p>
              <Button asChild size="lg">
                <Link to="/contact">Work With Me</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src="/placeholder.svg" 
                  alt="Artist studio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gallery-gold rounded-lg opacity-80"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
