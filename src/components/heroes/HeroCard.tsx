import { Link } from 'react-router-dom';
import type { Hero } from '@/types/hero.model';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

interface HeroCardProps {
  hero: Hero;
}

export default function HeroCard({ hero }: HeroCardProps) {
  const handleDelete = () => {
    if (confirm(`Tem certeza que deseja excluir ${hero.heroName}?`)) {
      console.log("Deletar herói:", hero.id);
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{hero.heroName}</CardTitle>
        <CardDescription>Nome: {hero.name}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <h4 className="font-semibold mb-2">Superpoderes:</h4>
        <ul className="list-disc list-inside text-sm">
          {hero.superpowers.map((power, index) => (
            <li key={index}>{power}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" asChild>
          <Link to={`/edit/${hero.id}`}>Editar</Link>
        </Button>
        <Button variant="destructive" onClick={handleDelete}>Excluir</Button>
      </CardFooter>
    </Card>
  );
}