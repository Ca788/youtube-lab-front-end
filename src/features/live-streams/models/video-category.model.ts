export interface VideoCategory {
  id: string;
  title: string;
}

const CATEGORY_TITLES_PT: Record<string, string> = {
  '1': 'Filmes e animacao',
  '2': 'Autos e veiculos',
  '10': 'Musica',
  '15': 'Pets e animais',
  '17': 'Esportes',
  '19': 'Viagens e eventos',
  '20': 'Games',
  '22': 'Pessoas e blogs',
  '23': 'Comedia',
  '24': 'Entretenimento',
  '25': 'Noticias e politica',
  '26': 'Como fazer e estilo',
  '27': 'Educacao',
  '28': 'Ciencia e tecnologia',
  '29': 'ONGs e ativismo',
};

const CATEGORY_TITLE_ALIASES_PT: Record<string, string> = {
  'film & animation': 'Filmes e animacao',
  'autos & vehicles': 'Autos e veiculos',
  music: 'Musica',
  'pets & animals': 'Pets e animais',
  sports: 'Esportes',
  'travel & events': 'Viagens e eventos',
  gaming: 'Games',
  'people & blogs': 'Pessoas e blogs',
  comedy: 'Comedia',
  entertainment: 'Entretenimento',
  'news & politics': 'Noticias e politica',
  'howto & style': 'Como fazer e estilo',
  education: 'Educacao',
  'science & technology': 'Ciencia e tecnologia',
  'nonprofits & activism': 'ONGs e ativismo',
};

export function videoCategoryTitlePt(category: VideoCategory): string {
  return (
    CATEGORY_TITLES_PT[category.id] ??
    CATEGORY_TITLE_ALIASES_PT[category.title.trim().toLowerCase()] ??
    category.title
  );
}
