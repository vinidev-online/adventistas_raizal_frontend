import { useContext } from 'react';
import { TemaCtx } from '../contexts/TemaCtx';

export const useTema = () => useContext(TemaCtx);
