import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useRef, useState } from 'react';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

export type TArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	setArticleState: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: TArticleParamsFormProps) => {
	const { currentArticleState, setArticleState } = props;

	const initailState = useRef(currentArticleState);
	const asideRef = useRef(null);

	const [isFormOpen, setFormOpen] = useState(false);
	const [currentFormState, setFormState] = useState(currentArticleState);

	useOutsideClickClose({
		isOpen: isFormOpen,
		rootRef: asideRef,
		onChange: setFormOpen,
	});

	function toggleForm() {
		if (isFormOpen) {
			closeForm();
		} else {
			openForm();
		}
	}

	function openForm() {
		setFormOpen(true);
	}

	function closeForm() {
		setFormOpen(false);
	}

	function handleChange(key: keyof ArticleStateType, value: OptionType) {
		setFormState({ ...currentFormState, [key]: value });
	}

	function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
		event.preventDefault();
		setArticleState({ ...currentFormState });
	}

	function handleReset() {
		setArticleState({ ...initailState.current });
		setFormState({ ...initailState.current });
	}

	return (
		<>
			<ArrowButton
				isOpen={isFormOpen}
				onClick={() => {
					toggleForm();
				}}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}
				ref={asideRef}>
				<form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
					<Text size={31} weight={800} uppercase={true}>
						{'Задайте параметры'}
					</Text>
					<Select
						title='Шрифт'
						selected={currentFormState.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder={currentFormState.fontFamilyOption.title}
						onChange={(option) => handleChange('fontFamilyOption', option)}
					/>
					<RadioGroup
						title={'Размер Шрифта'}
						options={fontSizeOptions}
						selected={currentFormState.fontSizeOption}
						name={'font-size'}
						onChange={(option) => handleChange('fontSizeOption', option)}
					/>
					<Select
						title='Цвет Шрифта'
						selected={currentFormState.fontColor}
						options={fontColors}
						placeholder={currentFormState.fontColor.title}
						onChange={(option) => handleChange('fontColor', option)}
					/>
					<Separator />
					<Select
						title='Цвет Фона'
						selected={currentFormState.backgroundColor}
						options={backgroundColors}
						placeholder={currentFormState.backgroundColor.title}
						onChange={(option) => handleChange('backgroundColor', option)}
					/>
					<Select
						title='Ширина Контента'
						selected={currentFormState.contentWidth}
						options={contentWidthArr}
						placeholder={currentFormState.contentWidth.title}
						onChange={(option) => handleChange('contentWidth', option)}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => handleReset()}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
