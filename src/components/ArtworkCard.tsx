
import { Heart, Eye } from 'lucide-react';
import { useState } from 'react';

interface ArtworkCardProps {
  id: string;
  title: string;
  artist: string;
  price: number;
  image: string;
  likes?: number;
  views?: number;
}

const ArtworkCard = ({ title, artist, price, image, likes = 0, views = 0 }: ArtworkCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group bg-card rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gallery-cream">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex space-x-4">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full transition-colors ${
                isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-800 hover:bg-red-500 hover:text-white'
              }`}
            >
              <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
            <button className="p-2 rounded-full bg-white text-gray-800 hover:bg-gallery-gold hover:text-white transition-colors">
              <Eye size={20} />
            </button>
          </div>
        </div>

        {/* Stats overlay */}
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 rounded-lg px-2 py-1 text-white text-xs flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Heart size={12} />
            <span>{likes}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye size={12} />
            <span>{views}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-foreground mb-1 line-clamp-1">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-2">by {artist}</p>
        <p className="text-gallery-gold font-semibold text-lg">${price.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ArtworkCard;
