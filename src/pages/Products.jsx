import { useEffect, useState } from "react";
import { products as initialProducts, categories as allCategories } from "../data/products";
import 'bootstrap/dist/css/bootstrap.min.css';

const Products = () => {
   
    const activeCategories = allCategories.filter(cat => 
        cat.name === 'Artwork' || cat.name === 'Cosmos'
    );

    const [allProducts, setAllProducts] = useState(() => {
        const saved = localStorage.getItem("my_records");
        return saved ? JSON.parse(saved) : initialProducts;
    });

   
    const [activeTab, setActiveTab] = useState(activeCategories[0]?.id || 1);
    const [entryText, setEntryText] = useState('');

    useEffect(() => {
        localStorage.setItem("my_records", JSON.stringify(allProducts));
    }, [allProducts]);

    const addProduct = () => {
        if (!entryText.trim()) return;
        
        const newRecord = {
            id: Date.now(),
            name: entryText,
            category_id: activeTab, 
            completed: false 
        };
        
        setAllProducts([newRecord, ...allProducts]);
        setEntryText('');
    };

    const displayProducts = allProducts
        .filter(p => p.category_id === activeTab)
        .filter(p => p.name.toLowerCase().includes(entryText.toLowerCase()));

    return (
        <div className="container-fluid py-5">
            <div className="row justify-content-center">
                
              
                <div className="col-md-3 col-lg-2">
                    <div className="list-group shadow-sm">
                        {activeCategories.map(cat => (
                            <button
                                key={cat.id}
                                className={`list-group-item list-group-item-action border-2 border-dark rounded-0 d-flex justify-content-between align-items-center ${activeTab === cat.id ? 'active bg-primary text-white' : ''}`}
                                onClick={() => setActiveTab(cat.id)}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

               
                <div className="col-md-7 col-lg-5">
                    <h1 className="fw-bold mb-4">
                        {activeCategories.find(c => c.id === activeTab)?.name} List
                    </h1>

                    <div className="input-group mb-4">
                        <input 
                            type="text" 
                            className="form-control form-control-lg border-2 border-dark rounded-0 shadow-none" 
                            placeholder="Search or add task..."
                            value={entryText} 
                            onChange={(e) => setEntryText(e.target.value)} 
                            onKeyPress={(e) => e.key === 'Enter' && addProduct()}
                        />
                        <button className="btn btn-dark rounded-0 px-4" onClick={addProduct}>Add</button>
                    </div>

                    <div className="todo-list">
                        {displayProducts.map((i) => (
                            <div key={i.id} className="p-3 mb-2 border border-2 border-dark d-flex justify-content-between align-items-center bg-white shadow-sm">
                                <div className="d-flex align-items-center">
                                    <input type="checkbox" className="form-check-input border-dark me-3" style={{width: "25px", height: "25px"}} />
                                    <span className="fs-5">{i.name}</span>
                                </div>
                                <button className="btn btn-sm btn-danger rounded-0" onClick={() => {
                                    if(window.confirm("Удалить?")) setAllProducts(allProducts.filter(p => p.id !== i.id))
                                }}>Delete</button>
                            </div>
                        ))}
                        
                        {displayProducts.length === 0 && (
                            <div className="text-center py-5 border-2 border-dashed border-dark text-muted mt-3">
                                No tasks in "{activeCategories.find(c => c.id === activeTab)?.name}"
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Products;