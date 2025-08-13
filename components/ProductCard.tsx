import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  id: string;
  name: string;
  origin: string;
  price: number;
  notes: string[];
  imageUrl?: string;
  roastLevel: "light" | "medium" | "dark";
}

const ProductCard = ({ id, name, origin, price, notes, imageUrl, roastLevel }: ProductCardProps) => {
  const roastColors = {
    light: "bg-yellow-200",
    medium: "bg-orange-300",
    dark: "bg-amber-800",
  };

  return (
    <Link href={`/shop/product/${id}`} className="group">
      <div className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="aspect-square bg-gray-100 relative overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="text-center">
                <div className="text-6xl font-bold text-gray-300 mb-2">☕</div>
                <span className="text-gray-400 text-sm">Coffee Bag</span>
              </div>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 text-xs font-medium ${roastColors[roastLevel]} text-black rounded`}>
              {roastLevel}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 group-hover:text-accent transition-colors">
            {name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{origin}</p>
          <div className="flex flex-wrap gap-1 mb-3">
            {notes.map((note, index) => (
              <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                {note}
              </span>
            ))}
          </div>
          <p className="font-semibold text-lg">${price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;