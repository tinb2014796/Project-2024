import React, { useState } from 'react';
import Modal from './Modal';
 // Giả sử bạn đã có component Modal


const AddCategory = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState(null);


    const handleSubmit = (e) => {
        router.post('/admin/categories/create', {
            c_name: categoryName,
            c_image: categoryImage,
            onSuccess: () => {
                setIsOpen(false);
            }
        });
        e.preventDefault();
        // Xử lý logic thêm danh mục ở đây
        console.log('Tên danh mục:', categoryName);
        console.log('Hình ảnh danh mục:', categoryImage);
        setIsOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Thêm Danh Mục
            </button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <h2 className="text-2xl font-bold mb-4">Thêm Danh Mục Mới</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="c_name" className="block text-sm font-medium text-gray-700">
                            Tên Danh Mục
                        </label>
                        <input
                            type="text"
                            // id="c_name"
                            name="c_name"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="c_image" className="block text-sm font-medium text-gray-700">
                            Hình Ảnh Danh Mục
                        </label>
                        <input
                            type="file"
                            // id="c_image"
                            name="c_image"
                            onChange={(e) => setCategoryImage(e.target.files[0])}
                            className="mt-1 block w-full"
                            accept="image/*"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="mr-2 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Thêm
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default AddCategory;

