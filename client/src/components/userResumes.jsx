import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import ResumeCard from './ResumeCard'

function UserResumes() {
    const [resumes, setResumes] = useState([])
    const { user, loading } = useAuth()
    const userId = user?._id
    // console.log('uid:',userId)

    const fetchResumes = async () => {
        try {
            const api = await fetch(`http://localhost:3000/get/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })
            if (!api.ok) {
                throw new Error('Failed to fetch resume data');
            }
            const result = await api.json()
            console.log('result:',result)
            setResumes(result.data || [])
        } catch (error) {
            console.error('Error fetching resumes:', error)
        }
    }

    useEffect(() => {
        if (userId) {
            fetchResumes()
        }
    }, [userId])

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-black">Loading...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-black">My Resumes</h1>
                        <p className="text-gray-600 mt-2">Click on a card to view details</p>
                    </div>
                    <Link
                        to="/build"
                        className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
                    >
                        + Create New
                    </Link>
                </div>

                {/* Resume Cards Grid */}
                {resumes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {resumes.map((resume, index) => (
                            <ResumeCard 
                                key={resume._id || index} 
                                resume={resume} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-xl">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No resumes yet</h3>
                        <p className="text-gray-500 mb-6">Create your first professional resume</p>
                        <Link
                            to="/build"
                            className="inline-block bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
                        >
                            Create Resume
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserResumes