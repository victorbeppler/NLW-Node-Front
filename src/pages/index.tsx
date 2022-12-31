import Image from 'next/image';
import appPreviewImg from '../assets/app-nlw-copa-preview.png';
import logo from '../assets/logo.svg';
import avatarUser from '../assets/users-avatar.png';
import iconCheckImg from '../assets/icon-check.svg';
import { api } from '../lib/axios';
import { FormEvent, useState } from 'react';
import { GetStaticProps } from 'next';

interface HomeProps {
  poolCount: number
  guessesCount: number
  usersCount: number
}

export default function Home(props: HomeProps) {

  const [poolTitle, setPoolTitle] = useState("");

  async function CreatePool(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post('/pools', {
        title: poolTitle,
      });

      const { code } = response.data;

      await navigator.clipboard.writeText(code);

      alert('Bolão criado com sucesso, o código foi copiado para a área de transferência.');

      setPoolTitle("");
    } catch (error) {
      console.log(error)
      alert("Erro ao criar o bolão, tente novamente mais tarde.")
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28">
      <main>
        <Image src={logo} alt="Logo do NLW" quality={100} />
        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={avatarUser} alt="Avatar do usuário" quality={100} />
          <strong className="text-nlw-100 gap-2">
            <span className="text-ignite-500 ">+{props.usersCount} </span>
            pessoas já estão usando
          </strong>
        </div>

        <form className="mt-10 flex gap-2" onSubmit={CreatePool}>
          <input
            className="flex-1 px-6 py-4 rounded bg-nlw-800 border border-nlw-600 text-sm text-nlw-100 "
            type="text"
            placeholder="Qual o nome do seu bolão"
            onChange={event => setPoolTitle(event.target.value)}
            value={poolTitle}
          />
          <button
            className="bg-yellowNlw-500 px-6 py-4 rounded text-nlw-900 font-bold text-sm uppercase hover:bg-yellowNlw-700"
            type="submit"
          >
            Criar meu bolão
          </button>
        </form>

        <p className="text-nlw-300 mt-4 text-sm leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>
        <div className="mt-10 pt-10 border-t border-nlw-600 flex items-center justify-between text-nlw-100">
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="Ícone de check" width={40} height={40} quality={100} />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-px h-14 bg-nlw-600" />

          <div className="flex items-center gap-6">
            <Image src={iconCheckImg}
              alt="Ícone de check"
              width={40}
              height={40}
              quality={100} />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.guessesCount}</span>
              <span>Palpites Criados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImg}
        alt="Celulares exibindo a preview do app mobile."
        width={518}
        height={605}
        quality={100}
      />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count'),
  ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
    revalidate: 10 * 60, // 10 minutes
  };
};