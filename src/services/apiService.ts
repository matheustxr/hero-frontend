import axios from 'axios';
import type  { Hero } from '@/types/hero.model';
import type  { HeroFormData } from '@/types/hero-form-data.model';
import type  { Superpower } from '@/types/superpower.model';

const apiClient = axios.create({
  baseURL: 'https://localhost:7144/api',
});

export const getAllHeroes = () => apiClient.get<Hero[]>('/heroes');
export const getHeroById = (id: number) => apiClient.get<Hero>(`/heroes/${id}`);
export const createHero = (heroData: HeroFormData) => apiClient.post<Hero>('/heroes', heroData);
export const updateHero = (id: number, heroData: HeroFormData) => apiClient.put<Hero>(`/heroes/${id}`, heroData);
export const deleteHero = (id: number) => apiClient.delete(`/heroes/${id}`);
export const getAllSuperpowers = () => apiClient.get<Superpower[]>('/superpowers');