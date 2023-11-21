import type { Category } from '../types.ts'

type Props = {
    category: Category | "",
    setCategory: React.Dispatch<React.SetStateAction<Category | "">>
    notNull?: boolean
}

const CategorySelector = ({category, setCategory, notNull}:Props) => {
    const categories:(Category | "")[] = ['breakfast','lunch','dinner','fast food','dessert',""]
    return ( 
        <div className='category-selector'>
            {categories.map((item,index) => {
                if(notNull && item === ''){
                    return 
                }else {
                    return <div key={index}>
                        <input type='radio' name='cat_selector' id={`cat-${item}`} checked={item === category} value={item} onChange={() => setCategory(item)}/>
                        <label htmlFor={`cat-${item}`}>{item || 'All'}</label>
                    </div>
                }
            })}
        </div>
     );
}
 
export default CategorySelector;