import { useEffect, useState } from "react";
import LeftSidebar from "../components/left-sidebar";
import { products, categories } from "../data/products";
import 'bootstrap/dist/css/bootstrap.min.css';

const Products = () => {
   
    const [product, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(''); 
    const [category, setCategory] = useState(''); 

  
    const fetchProducts = () => {
        setProducts(products);
    }

   
    const searchProducts = (searchText) => {
        const search = products.filter((p) => 
            p.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setProducts(search);
    }

   
    const addProduct = () => {
        if (!name || !category) {
            alert('Введите имя клиента и выберите услугу!');
            return;
        }

        const newRecord = {
            id: Date.now(), 
            name: name,
            description: description,
            price: price, 
            category_id: parseInt(category), 
            brand: "Ожидает подтверждения", 
        };

        setProducts([...product, newRecord]);
        alert('Запись к менеджеру создана!');
        
        
        setName('');
        setDescription('');
        setPrice('');
        setCategory('');
    }

    const deleteProduct = (id) => {
        setProducts(product.filter((p) => p.id !== id));
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="container-fluid py-4">
            <div className="row">
               
                <div className="col-3">
                    <LeftSidebar />
                </div>

               
                <div className="col-9">
                    <div className="card p-4 mb-4 shadow-sm border-0 bg-light">
                        <h2 className="mb-3">Новая запись к менеджеру</h2>
                        <div className="row g-3">
                            <div className="col-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="ФИО клиента"
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="col-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Время или номер очереди"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="col-6">
                                <select 
                                    className="form-select"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">Выберите тип услуги...</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Краткое описание вопроса"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="col-12">
                                <button className="btn btn-primary w-100" onClick={addProduct}>Записать клиента</button>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>Текущие записи</h1>
                        <div className="w-25">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="🔍 Поиск клиента..."
                                onChange={(e) => searchProducts(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row">
                        {product.length > 0 ? (
                            product.map((i) => {
                                
                                const catName = categories.find(c => c.id === i.category_id)?.name || 'Общий вопрос';
                                return (
                                    <div className="col-4 mb-4" key={i.id}>
                                        <div className="card h-100 shadow-sm border-start border-primary border-4">
                                            <div className="card-body">
                                                <h5 className="card-title">{i.name}</h5>
                                                <h6 className="card-subtitle mb-2 text-muted">{catName}</h6>
                                                <p className="card-text">{i.description}</p>
                                                <div className="d-flex justify-content-between align-items-center mt-3">
                                                    <span className="badge bg-info text-dark">Очередь: {i.price}</span>
                                                    <button 
                                                        className="btn btn-outline-danger btn-sm" 
                                                        onClick={() => deleteProduct(i.id)}
                                                    >
                                                        Отменить
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="card-footer bg-transparent text-muted small">
                                                Менеджер: {i.brand || "Не назначен"}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-12 text-center mt-5">
                                <h3>Записей пока нет</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products;