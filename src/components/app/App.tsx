import clsx from 'clsx';

import { useState, CSSProperties } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from '../../styles/index.module.scss';

export const App = () => {
	const [articleState, setArticleState] = useState({ ...defaultArticleState });

	const handleArticleStateChange = (state: ArticleStateType) => {
		setArticleState({ ...state });
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm saveChanges={handleArticleStateChange} />
			<Article />
		</main>
	);
};
