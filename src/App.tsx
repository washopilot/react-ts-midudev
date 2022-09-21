import { useEffect, useRef, useState } from 'react';
import './App.css';
import Form from './components/Form';
import List from './components/List';

import { Sub, SubFromApi } from './models';

interface AppState {
    subs: Sub[];
    newSubsNumber: number;
}

const App = () => {
    const [subs, setSubs] = useState<AppState['subs']>([]);
    const [newSubsNumber, setNewSubsNumber] = useState<AppState['newSubsNumber']>(0);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchSubs = (): Promise<SubFromApi[]> => {
            return fetch('http://localhost:8000/api/subs').then((res) => res.json());
        };

        const mapFromApiToSubs = (apiResponse: SubFromApi[]): Sub[] => {
            return apiResponse.map((subFromApi) => {
                const { nick, months: subMonths, profileUrl: avatar, description } = subFromApi;
                return {
                    nick,
                    subMonths,
                    avatar,
                    description
                };
            });
        };

        fetchSubs().then((apiSubs) => {
            console.log(apiSubs);
            setSubs(mapFromApiToSubs(apiSubs));
        });
    }, []);

    const handleNewSub = (newSub: Sub): void => {
        setSubs((prev) => [...prev, newSub]);
        setNewSubsNumber((n) => n + 1);
    };

    return (
        <div className="App" ref={divRef}>
            <h1>midu subs</h1>
            <List subs={subs} />
            New Subs: {newSubsNumber}
            <Form onNewSub={handleNewSub} />
        </div>
    );
};

export default App;
