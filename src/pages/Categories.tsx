import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Category } from '../types';

export const Categories: React.FC = () => {
  const { data: categories, isLoading } = useQuery(['categories'], async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    if (error) throw error;
    return data as Category[];
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">التصنيفات</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories?.map((category) => (
          <Link
            key={category.id}
            to={`/categories/${category.slug}`}
            className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4 rtl:space-x-reverse">
                {category.icon && (
                  <img 
                    src={category.icon}
                    alt=""
                    className="w-8 h-8 text-indigo-600"
                  />
                )}
                <h2 className="text-xl font-semibold text-gray-900">
                  {category.name}
                </h2>
              </div>
              
              {category.description && (
                <p className="text-gray-600 text-sm">
                  {category.description}
                </p>
              )}
              
              <div className="mt-4 flex items-center text-sm text-indigo-600 group-hover:text-indigo-700">
                <span>تصفح الكتب</span>
                <svg className="ml-2 w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};