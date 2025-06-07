
import ArtworkCard from '@/components/ArtworkCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { useState } from 'react';

const Store = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const artworks = [
    {
      id: '1',
      title: 'Sunset Dreams',
      artist: 'Your Name',
      price: 2500,
      image: '/placeholder.svg',
      likes: 42,
      views: 156,
      category: 'painting'
    },
    {
      id: '2',
      title: 'Urban Reflections',
      artist: 'Your Name',
      price: 1800,
      image: '/placeholder.svg',
      likes: 38,
      views: 203,
      category: 'photography'
    },
    {
      id: '3',
      title: 'Abstract Symphony',
      artist: 'Your Name',
      price: 3200,
      image: '/placeholder.svg',
      likes: 67,
      views: 298,
      category: 'painting'
    },
    {
      id: '4',
      title: 'Marble Goddess',
      artist: 'Your Name',
      price: 4500,
      image: '/placeholder.svg',
      likes: 89,
      views: 445,
      category: 'sculpture'
    },
    {
      id: '5',
      title: 'Digital Renaissance',
      artist: 'Your Name',
      price: 1200,
      image: '/placeholder.svg',
      likes: 56,
      views: 234,
      category: 'digital'
    },
    {
      id: '6',
      title: 'Ocean Waves',
      artist: 'Your Name',
      price: 2800,
      image: '/placeholder.svg',
      likes: 73,
      views: 312,
      category: 'painting'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Work' },
    { value: 'painting', label: 'Paintings' },
    { value: 'photography', label: 'Photography' },
    { value: 'sculpture', label: 'Sculptures' },
    { value: 'digital', label: 'Digital Art' }
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-1000', label: 'Under $1,000' },
    { value: '1000-2500', label: '$1,000 - $2,500' },
    { value: '2500-5000', label: '$2,500 - $5,000' },
    { value: '5000+', label: '$5,000+' }
  ];

  const filteredArtworks = artworks.filter(artwork => {
    const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || artwork.category === selectedCategory;
    
    let matchesPrice = true;
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
      if (max) {
        matchesPrice = artwork.price >= parseInt(min) && artwork.price <= parseInt(max);
      } else {
        matchesPrice = artwork.price >= parseInt(min);
      }
    }
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gallery-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4">
            My Portfolio
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Original artworks available for purchase and commission
          </p>
        </div>
      </div>

      {/* Simplified Filters */}
      <div className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Search artworks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-4 items-center">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map(range => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredArtworks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} {...artwork} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-4">No artworks found</p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setPriceRange('all');
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Store;
