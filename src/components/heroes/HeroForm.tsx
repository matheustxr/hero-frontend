import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';

import type  { Hero } from '@/types/hero.model';
import type  { HeroFormData } from '@/types/hero-form-data.model';
import type  { Superpower } from '@/types/superpower.model';
import { createHero, updateHero, getAllSuperpowers } from '@/services/apiService';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const heroFormSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório.").max(120),
  heroName: z.string().min(1, "O nome de herói é obrigatório.").max(120),
  birthDate: z.coerce.date().refine(val => !isNaN(val.getTime()), {
   message: "A data de nascimento é obrigatória."
  }),
  height: z.coerce.number().min(0.01, "A altura deve ser maior que zero."),
  weight: z.coerce.number().min(0.01, "O peso deve ser maior que zero."),
  superpowerIds: z.array(z.number()).min(1, "Selecione pelo menos um superpoder."),
});

interface HeroFormProps {
  initialData?: Hero;
}

export default function HeroForm({ initialData }: HeroFormProps) {
  const navigate = useNavigate();
  const [availablePowers, setAvailablePowers] = useState<Superpower[]>([]);
  const isEditing = !!initialData;

  const { register, handleSubmit, control, reset, setError, formState: { errors, isSubmitting } } = useForm<HeroFormData>({
    defaultValues: {
      name: '',
      heroName: '',
      birthDate: undefined, 
      height: 0,
      weight: 0,
      superpowerIds: [],
    },
  });

  useEffect(() => {
    getAllSuperpowers()
      .then(response => {
        setAvailablePowers(response.data);
        console.log("Superpoderes carregados:", response.data);
      })
      .catch(() => toast.error("Falha ao carregar superpoderes."));
  }, []);

  useEffect(() => {
    if (initialData && availablePowers.length > 0) {
      const heroSuperpowerIds = availablePowers
        .filter(power => initialData.superpowers.includes(power.superpower))
        .map(power => power.id);

      reset({
        name: initialData.name,
        heroName: initialData.heroName,
        birthDate: new Date(initialData.birthDate),
        height: initialData.height,
        weight: initialData.weight,
        superpowerIds: heroSuperpowerIds,
      });
    }
  }, [initialData, availablePowers, reset]);

  const onSubmit: SubmitHandler<HeroFormData> = async (data) => {
    const validationResult = heroFormSchema.safeParse(data);

    if (!validationResult.success) {
      validationResult.error.issues.forEach((issue) => {
        setError(issue.path[0] as keyof HeroFormData, {
          type: 'manual',
          message: issue.message,
        });
      });
      return;
    }

    try {
      if (isEditing && initialData) {
        await updateHero(initialData.id, validationResult.data);
        toast.success("Herói atualizado com sucesso!");
      } else {
        await createHero(validationResult.data);
        toast.success("Herói criado com sucesso!");
      }
      navigate('/');
    } catch (error: unknown) {
      let errorMessage = "Ocorreu um erro inesperado.";
      if (isAxiosError(error)) {
        errorMessage = error.response?.data as string || "Erro da API não especificado.";
      }
      toast.error(errorMessage);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
        <CardHeader>
            <CardTitle>{isEditing ? "Editar Herói" : "Adicionar Novo Herói"}</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name" {...register("name")} />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="heroName">Nome de Herói</Label>
                        <Input id="heroName" {...register("heroName")} />
                        {errors.heroName && <p className="text-red-500 text-sm mt-1">{errors.heroName.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="birthDate">Data de Nascimento</Label>
                        <Input id="birthDate" type="date" {...register("birthDate", { valueAsDate: true })} />
                        {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="height">Altura (m)</Label>
                        <Input id="height" type="number" step="0.01" {...register("height", { valueAsNumber: true })} />
                        {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="weight">Peso (kg)</Label>
                        <Input id="weight" type="number" step="0.01" {...register("weight", { valueAsNumber: true })} />
                        {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>}
                    </div>
                </div>
                <div>
                    <Label>Superpoderes</Label>
                    <Controller
                        name="superpowerIds"
                        control={control}
                        render={({ field }) => (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2 p-4 border rounded-md">
                                {availablePowers.map(power => (
                                    <div key={power.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`power-${power.id}`}
                                        checked={field.value?.includes(power.id)}
                                        onCheckedChange={(checked) => {
                                        return checked
                                            ? field.onChange([...field.value, power.id])
                                            : field.onChange(field.value?.filter(id => id !== power.id));
                                        }}
                                    />
                                    <Label htmlFor={`power-${power.id}`} className="font-normal">{power.superpower}</Label>
                                    </div>
                                ))}
                            </div>
                        )}
                    />
                    {errors.superpowerIds && <p className="text-red-500 text-sm mt-1">{errors.superpowerIds.message}</p>}
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => navigate('/')}>Cancelar</Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Salvando..." : "Salvar"}
                </Button>
            </CardFooter>
        </form>
    </Card>
  );
}