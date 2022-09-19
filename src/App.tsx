import React, {
	FC,
	PropsWithChildren,
	ReactChild,
	ReactNode,
	HTMLProps,
	useState,
	useEffect,
	useReducer,
	useRef,
	useContext,
	createContext,
	useCallback,
	useMemo,
} from 'react';

//! Chilren Types

//~ Method 1 -- Позволяет передовать любое количество элементов как children
type TypeChildrenOne = { children: ReactNode | undefined };

//~ Method 2 -- Позволяет передать толко один элемент как children
interface IChildrenTwo {
	children: string;
}

//~ Method 3 -- Позволяет передать толко один элемент как children - устарел(не изпользуется)
interface IChildrenThree {
	children: ReactChild | JSX.Element;
}

//~ Method 4 -- PropsWithChildren позволяет передовать любое количество элементов как children
interface ITitle {
	title: string;
}
// interface ITitle extends PropsWithChildren {
// 	title: string;
// }

const ChildrenElementWithTypeScript: FC<PropsWithChildren<ITitle>> = ({ title, children }) => {
	console.log(title);
	return <>{children}</>;
};
// const ChildrenElementWithTypeScript: FC<ITitle> = ({ title, children }) => {
// 	console.log(title);
// 	return <>{children}</>;
// };

//! HTML Props -- Позволяет нам передать props самому HTML элементу

const InputHTMLElemen = (props: HTMLProps<HTMLInputElement>) => {
	//~ Так пишется type для Event

	//~ 1 Method
	const onChangeOne = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.value);
	};
	//~ 2 Method
	const onChangeTwo: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		console.log(event.target.value);
	};

	//~ 3 Method
	const onClickThree: React.ReactEventHandler = (e) => {
		console.log(e.target);
	};

	return (
		<>
			<input type="text" {...props} onChange={onChangeOne} onClick={onClickThree} />
		</>
	);
};

interface IDescription {
	complited: boolean;
	id: number;
	title: string;
	userId: number;
}

//~ useReducer ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const initialState = { count: 0 };

type ACTIONTYPE = { type: 'increment'; payload: number } | { type: 'decrement'; payload: string };

function reducer(state: typeof initialState, action: ACTIONTYPE) {
	switch (action.type) {
		case 'increment':
			return { count: state.count + action.payload };
		case 'decrement':
			return { count: state.count - Number(action.payload) };
		default:
			throw new Error();
	}
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//~ createContext & useContext ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

interface IUser {
	name: string;
	age: number;
	isMarried: boolean;
}

const user: IUser = {
	name: 'Aslan',
	age: 28,
	isMarried: false,
};

const UserContext = createContext<IUser>(user);

const ForTheUseContext = () => {
	const data: IUser = useContext<IUser>(UserContext);

	return (
		<>
			{data.name}
			{data.age}
		</>
	);
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const App: FC = () => {
	//! Hooks Types - Типы для хуков
	//~ useState ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	const [value, setValue] = useState<string>('');

	//~ useReducer ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	const [state, dispatch] = useReducer(reducer, initialState);

	const getData = async (): Promise<IDescription> => {
		const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
		return response.json();
	};
	//~ useEffect ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	useEffect(() => {
		getData().then((data: IDescription) => {
			console.log(data.title);
		});
	}, []);
	//~ useRef ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	const divRef = useRef<HTMLDivElement>(null); //~ RefObject - MutableRefObject
	console.log(divRef);
	const inputRef = useRef<HTMLInputElement>(null); //~ RefObject - MutableRefObject
	console.log(inputRef);
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	//~ useCallback ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	const useCallbackFn = useCallback<() => string>(() => {
		return 'useCallback is done';
	}, []);
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	//~ useMemo ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	const useMemoFn = useMemo<string>(() => {
		return 'useMemo is done';
	}, []);
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	//~ React.CSSProperties - Для того что бы мы могли описывать css ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


	//~ FormEvent
	const onFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
	};

	console.log('Date---->>', Date().toString());

	return (
		<>
			<UserContext.Provider value={user}>
				<ChildrenElementWithTypeScript title="TypeScript">
					TypeScript with React<div></div>
				</ChildrenElementWithTypeScript>
				<InputHTMLElemen disabled={false} />
				<input type="text" ref={inputRef} />
				<div ref={divRef}></div>
				<ForTheUseContext />
				<form action="" onSubmit={onFormSubmitHandler}>
					<input type="text" />
					<button>Sumbit</button>
				</form>
			</UserContext.Provider>
		</>
	);
};

export default App;
