import axios from 'axios';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import { Button, Ptag, Rating, Tag } from '../components';
import { Htag } from '../components/Htag/Htag';
import { MenuItem } from '../interfaces/menu.interface';
import { withLayout } from '../layout/Layout/Layout';

function Home({ menu }: HomeProps): JSX.Element {
	const [rating, setRating] = useState<number>(4);

	return (
		<>
			<Htag tag='h1'>Text</Htag>
			<Button appearance='primary' arrow='right'>Кнопка</Button>
			<Button appearance='ghost' arrow='down'>Кнопка</Button>
			<Ptag size='small'>Маленький</Ptag>
			<Ptag size='medium'>Средний</Ptag>
			<Ptag size='large'>Большой</Ptag>
			<Tag size='medium'>Средний</Tag>
			<Tag size='small'>Маленький</Tag>
			<Tag size='medium' color='red'>Средний</Tag>
			<Tag size='medium' color='green'>Средний</Tag>
			<Tag size='medium' color='primary'>Средний</Tag>
			<Rating rating={rating} isEditable={true} setRating={setRating}></Rating>
			<ul>
				{menu.map(m => (<li key={m._id.secondCategory}>{m._id.secondCategory}</li>))}
			</ul>
		</>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
		firstCategory
	});
	return {
		props: {
			menu,
			firstCategory
		}
	};
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[],
	firstCategory: number;
}