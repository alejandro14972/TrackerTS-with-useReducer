import { useEffect, useState } from "react";
import { categories } from '../data/categories'
import { activity } from "../types";

export default function Form() {

    const [activity, setActivity] = useState<activity>({
        category: 1,
        name: '',
        calories: 0
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        //const isNumber = ['category', 'calories'].includes(e.target.id); //identificar cuales queremos convertir a numero
        setActivity({
            ...activity,
            [e.target.id]: e.target.value
            //  [e.target.id]: isNumber ? + e.target.value : e.target.value
        })
    }

    const esValido = () =>{
        const {name, calories} = activity;
        //console.log(name.trim() !== '' && calories > 0);
        return name.trim() !== '' && calories > 0
        
    }

    const tituloBotonEnviar = () =>{
        if (activity.category == 1) {
            return "Guardar ejercicio"
        }
        return "Guardar comida"
    }

    useEffect(() => {
        tituloBotonEnviar();
    }, [activity]);


    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submit ...");
        
    }

    return (
        <form className="space-y-5 p-10 rounded-lg shadow bg-white"
                onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className='font-bold'>Categoria:</label>
                <select
                    value={activity.category}
                    onChange={handleChange}
                    id="category"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white">
                    {categories.map(categ => (
                        <option key={categ.id} value={categ.id}>
                            {categ.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className='font-bold'>Calorias:</label>
                <input type="text"
                    value={activity.name}
                    onChange={handleChange}
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    id='name'
                    placeholder='Ej. comida, zumo, ejercicio...'
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className='font-bold'>Calorias:</label>
                <input type="number"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    value={activity.calories}
                    onChange={handleChange}
                    id='calories'
                    placeholder='Clorias. Ej. 300 o 500'
                />
            </div>

            <input
                type='submit'
                className='bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10'
                value={tituloBotonEnviar()}
                disabled={!esValido()}
            />

        </form>
    )
}
