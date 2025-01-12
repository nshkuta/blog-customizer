import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

export const ArticleParamsForm = ({
	saveChanges,
}: {
	saveChanges: (savedState: ArticleStateType) => void;
}) => {
	const asideDiv = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [articleState, setArticleState] = useState({ ...defaultArticleState });

	const overlayClick = (e: MouseEvent) => {
		const { target } = e;
		if (!asideDiv.current?.contains(target as Node)) {
			closeSettings();
		}
	};

	const openSettings = () => {
		asideDiv.current?.classList.add(styles.container_open);
		setIsOpen(true);
		document.addEventListener('mousedown', overlayClick);
	};

	const closeSettings = () => {
		asideDiv.current?.classList.remove(styles.container_open);
		setIsOpen(false);
		document.removeEventListener('mousedown', overlayClick);
	};

	const getInputChangeHandler = (option: keyof ArticleStateType) => {
		return (selected: OptionType) => {
			setArticleState((prevState) => ({ ...prevState, [option]: selected }));
		};
	};

	const resetForm = () => {
		setArticleState({ ...defaultArticleState });
	};

	const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		saveChanges(articleState);
		closeSettings();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={openSettings} />
			<aside className={styles.container} ref={asideDiv}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={resetForm}>
					<Select
						selected={articleState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={getInputChangeHandler('fontFamilyOption')}
					/>
					<RadioGroup
						selected={articleState.fontSizeOption}
						options={fontSizeOptions}
						title='Размер шрифта'
						name='fontSize'
						onChange={getInputChangeHandler('fontSizeOption')}
					/>
					<Select
						selected={articleState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={getInputChangeHandler('fontColor')}
					/>
					<Separator />
					<Select
						selected={articleState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={getInputChangeHandler('backgroundColor')}
					/>
					<Select
						selected={articleState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={getInputChangeHandler('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
