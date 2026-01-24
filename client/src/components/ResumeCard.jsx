import React from 'react'
import { Link } from 'react-router-dom'
import {
  Briefcase,
  GraduationCap,
  Code,
  CalendarDays
} from 'lucide-react'

const ResumeCard = ({ resume }) => {
    const formatDate = (dateString) => {
        if (!dateString) return 'Present'
        try {
            const date = new Date(dateString)
            return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        } catch {
            return dateString
        }
    }

    const getLatestExperience = () => {
        if (!resume.experiences || resume.experiences.length === 0) return null
        return resume.experiences[0]
    }

    const getLatestEducation = () => {
        if (!resume.educations || resume.educations.length === 0) return null
        return resume.educations[0]
    }

    const getSkillsPreview = () => {
        if (!resume.skills || resume.skills.length === 0) return []
        return resume.skills.slice(0, 3)
    }

    const experience = getLatestExperience()
    const education = getLatestEducation()
    const skillsPreview = getSkillsPreview()

    return (
        <Link 
            to={`/resume/${resume._id || 'preview'}`}
            className="block group"
        >
            <div className="bg-white border-2 border-black rounded-lg p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="mb-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-black group-hover:text-gray-800">
                                {resume.firstName} {resume.lastName}
                            </h3>
                            {experience && (
                                <p className="text-gray-600 text-sm mt-1">{experience.jobTitle}</p>
                            )}
                        </div>
                        <div className="h-12 w-12 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold border-2 border-black">
                            {resume.firstName?.[0]}{resume.lastName?.[0]}
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    {experience && (
                        <div className="flex items-center text-sm text-gray-700">
                            <Briefcase className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="truncate">{experience.employer}</span>
                            <span className="mx-2">•</span>
                            <span className="text-gray-500 text-xs">
                                {formatDate(experience.jobStartDate)} - {experience.currentlyWorking ? 'Present' : formatDate(experience.jobEndDate)}
                            </span>
                        </div>
                    )}

                    {education && (
                        <div className="flex items-center text-sm text-gray-700">
                            <GraduationCap className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="truncate">{education.instituteName}</span>
                            <span className="mx-2">•</span>
                            <span className="text-gray-500 text-xs">{education.degree}</span>
                        </div>
                    )}

                    {skillsPreview.length > 0 && (
                        <div>
                            <div className="flex items-center text-sm text-gray-700 mb-1">
                                <Code className="h-4 w-4 mr-2" />
                                <span>Skills</span>
                            </div>
                            <div className="flex flex-wrap gap-1 ml-6">
                                {skillsPreview.map((skill, index) => (
                                    <span 
                                        key={index}
                                        className="inline-block bg-gray-100 text-black text-xs px-2 py-1 rounded border border-gray-300"
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                                {resume.skills?.length > 3 && (
                                    <span className="inline-block text-gray-500 text-xs px-2 py-1">
                                        +{resume.skills.length - 3} more
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="pt-3 border-t border-gray-200">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center">
                                <CalendarDays className="h-3 w-3 mr-1" />
                                Updated: {formatDate(resume.updatedAt || new Date().toISOString())}
                            </div>
                            <span className="text-black font-medium group-hover:underline">
                                View Details →
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ResumeCard
