import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

const Landing = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('greeting', { name: 'John' })}</p>
      <Button onClick={() => changeLanguage('en')}>English</Button>
      <Button onClick={() => changeLanguage('fr')}>French</Button>
    </div>
  );
};

export default Landing;
