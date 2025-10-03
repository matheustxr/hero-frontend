import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllHeroes } from '@/services/apiService';
import type { Hero } from '@/types/hero.model';
import { Button } from "@/components/ui/button";
import HeroCard from '@/components/heroes/HeroCard';

export default function HomePage() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await getAllHeroes();
        setHeroes(response.data);
      } catch (error) {
        console.error("Falha ao buscar heróis:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroes();
  }, []);

  if (loading) return <p className="text-center">Carregando...</p>;

  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gerenciador de Super-Heróis</h1>
        <Button asChild>
          <Link to="/add">Adicionar Herói</Link>
        </Button>
      </header>

      {heroes.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum herói cadastrado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {heroes.map((hero) => (
            <HeroCard key={hero.id} hero={hero} />
          ))}
        </div>
      )}
    </div>
  );
}