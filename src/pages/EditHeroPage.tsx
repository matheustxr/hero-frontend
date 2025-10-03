import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHeroById } from '@/services/apiService';
import type { Hero } from '@/types/hero.model';
import HeroForm from '@/components/heroes/HeroForm';

export default function EditHeroPage() {
  const { heroId } = useParams<{ heroId: string }>();
  
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (heroId) {
      const fetchHeroData = async () => {
        try {
          const response = await getHeroById(parseInt(heroId, 10));
          setHero(response.data);
        } catch (err) {
          console.error("Falha ao buscar dados do herói:", err);
          setError("Não foi possível encontrar o herói solicitado.");
        } finally {
          setLoading(false);
        }
      };
      fetchHeroData();
    }
  }, [heroId]);

  if (loading) {
    return <p className="text-center text-lg">Carregando dados do herói...</p>;
  }

  if (error || !hero) {
    return <p className="text-center text-red-500 text-lg">{error}</p>;
  }

  return (
    <div>
      <HeroForm initialData={hero} />
    </div>
  );
}