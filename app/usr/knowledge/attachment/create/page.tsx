'use client'
import { postFile } from '@@/src/hooks/CollectionAPI'
import { Notify } from '@@/src/utils/script'
import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState } from 'react'
import { AttachmentDataModel } from '../lib/model'
import { useGlobalContext } from '@@/src/providers/GlobalContext'
import { useRouter } from 'next/navigation'

export default function AttachmentCreatePage() {
    const [files, setFiles] = useState<File[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const { state, setState } = useGlobalContext()
    const router = useRouter()

    const handlerSubmit = async (e: React.FormEvent) => {
        setLoading(true)
        e.preventDefault()
        if(files.length === 0) return Notify("Files null can't upload", 'info')
        console.log(files)
        const formData = new FormData();
        Array.from(files).forEach(file => {
          formData.append('files', file);
        });
        formData.append('description', 'Ini descriptions')
        
        const result = await postFile(formData)
        const tomodel = AttachmentDataModel.toDatatableResponse(result.data)
        if(state.attachment){
            setState((prev: any) => ({
                ...prev,
                attachment: {
                    ...prev.attachment,
                    data: [ ...prev.attachment.data, ...tomodel ]
                }
            }))
        }
        router.push('/usr/knowledge/attachment')
        setLoading(false)
    }

    const handlerUploadPDF = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const filestarget = e.target.files ?? []
        console.log(filestarget)
        for (let index = 0; index < filestarget.length; index++) {
            const file = filestarget[index];
            const allowedExtensions = /(\.pdf)$/i;
            const maxSize = 5 * 1024 * 1024; // 5MB
        
            // Validasi ekstensi file
            // if (!allowedExtensions.exec(e.target.value)) {
            //     Swal.fire({
            //         icon:"info",
            //         title:"Alert",
            //         text:"File harus berupa PDF!"
            //     })
            //     e.target.value = '';
            //     return false;
            // }
            
            // Validasi ukuran file
            if (file.size > maxSize) {
                Notify(`${file.name} - File terlalu besar, maksimal 5MB!`, 'error')
                e.target.value = '';
                return false;
            }
            
            // setFiles([ ...files, file ])
            files.push(file)
            setFiles([ ...files ])
        }
    }

    const handleDeleteFile = (index: number) => {
        const filterdelete = [...files.slice(0, index), ...files.slice(index + 1)];
        setFiles(filterdelete)
    }

  return (
      <div className="w-full xl:w-3/4 relative h-screen overflow-y-auto">
        <div className='p-3 xl:p-5'>
            <label className="text-base xl:text-xl dark:text-white font-semibold flex items-center gap-2">
                <Icon icon={"iconamoon:attachment-light"} className='text-2xl'/>
                Upload File
            </label>
            <p className="font-light text-sm text-zinc-500 dark:text-zinc-300">
                Upload your file business first here to teach the AI ChatBot
            </p>

            <form onSubmit={e => handlerSubmit(e)} className={`${loading && 'pointer-events-none'} my-5 space-y-4`}>
                <div className="w-full">
                    {
                        files.length > 0 ?
                        files.map((file: File, index: number) => {
                            return (
                                <div className='flex items-center justify-between border p-2' key={index}>
                                    <div className='flex items-center gap-2 w-full'>
                                        <div className='w-10 h-10 rounded-md flex items-center justify-center text-white uppercase bg-red-500 text-sm font-bold'>
                                            <Icon icon={'basil:document-outline'} className='w-5 h-5'/>
                                        </div>
                                        <div>
                                            <h1 className='text-sm xl:text-base text-zinc-600'>{file.name}</h1>
                                            <p className='text-zinc-500 text-xs xl:text-sm'>{file.size} KB</p>
                                        </div>
                                    </div>
                                    <button type='button' onClick={() => handleDeleteFile(index)} className='w-10 h-10 rounded-md hover:bg-red-100 flex items-center justify-center transition-colors duration-300'>
                                        <Icon icon={'iconoir:trash'} className='text-red-500'/>
                                    </button>
                                </div>
                            )
                        })
                        
                        :
                        <label
                            className="flex justify-center items-center w-full h-56 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                            <div>
                                <span className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <span className="font-medium text-gray-600">
                                        Drop files to Attach, or 
                                        <span className="text-blue-600 underline"> browse</span>
                                    </span>
                                </span>
                                <p className="text-center text-zinc-500 text-xs uppercase tracking-wider font-light">Only PDF (MAX 5MB)</p>
                            </div>

                            <input type="file" name="file_upload" accept=".doc, .docx, .txt, .pdf" multiple className="hidden" onChange={(e) => handlerUploadPDF(e)}/>
                        </label>
                    }
                </div>
                {
                    loading ?
                    <div role="status" >
                        <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    :
                    <button className='btn-primary' disabled={files.length == 0 || loading}>Submit</button>
                }
            </form>
        </div>
      </div>
  )
}
