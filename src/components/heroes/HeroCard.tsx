import { Link } from 'react-router-dom';
import type { Hero } from '@/types/hero.model';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
// 1. Importar os componentes do AlertDialog
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface HeroCardProps {
  hero: Hero;
  onDelete: (id: number) => void;
}

export default function HeroCard({ hero, onDelete }: HeroCardProps) {
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

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Excluir</Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
              
              <AlertDialogDescription>
                Essa ação não pode ser desfeita. Isso excluirá permanentemente o herói
                "{hero.heroName}" e removerá seus dados de nossos servidores.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>

              <AlertDialogAction onClick={() => onDelete(hero.id)}>
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
      </CardFooter>
    </Card>
  );
}