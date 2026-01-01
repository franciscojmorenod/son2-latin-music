'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import SignatureCanvas from 'react-signature-canvas'

interface ContractData {
  id: number
  quote_id: number
  contract_token: string
  status: string
  unsigned_pdf_url: string
  signed_pdf_url: string | null
  signed_at: string | null
  expires_at: string
}

export default function SignContractPage() {
  const params = useParams()
  const token = params.token as string
  
  const [contract, setContract] = useState<ContractData | null>(null)
  const [loading, setLoading] = useState(true)
  const [signing, setSigning] = useState(false)
  const [error, setError] = useState('')
  
  const sigPadRef = useRef<SignatureCanvas>(null)

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const response = await fetch('/api/contracts/' + token)
        if (response.ok) {
          const data = await response.json()
          setContract(data)
        } else {
          setError('Contract not found')
        }
      } catch (err) {
        setError('Failed to load contract')
      } finally {
        setLoading(false)
      }
    }
    fetchContract()
  }, [token])

  const handleSign = async () => {
    if (!sigPadRef.current || sigPadRef.current.isEmpty()) {
      alert('Please provide your signature')
      return
    }

    setSigning(true)
    try {
      const signatureData = sigPadRef.current.toDataURL()
      
      const response = await fetch('/api/contracts/' + token + '/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signature: signatureData })
      })

      if (response.ok) {
        alert('Contract signed successfully!')
        window.location.reload()
      } else {
        const errorData = await response.json()
        alert(errorData.error || 'Failed to sign contract')
      }
    } catch (err) {
      alert('Error signing contract')
    } finally {
      setSigning(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white text-xl">Loading contract...</p>
      </div>
    )
  }

  if (error || !contract) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 p-8">
        <div className="max-w-md bg-gray-800 rounded-xl p-8 text-center border border-red-500">
          <h1 className="text-2xl font-bold text-white mb-4">Contract Not Found</h1>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    )
  }

  if (contract.status === 'signed') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 p-8">
        <div className="max-w-2xl bg-gray-800 rounded-xl p-8 text-center border border-green-500">
          <h1 className="text-3xl font-bold text-white mb-4">Contract Already Signed</h1>
          <p className="text-gray-400 mb-6">
            Signed on {contract.signed_at ? new Date(contract.signed_at).toLocaleString() : 'Unknown'}
          </p>
          {contract.signed_pdf_url && (
            
              href={contract.signed_pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium"
            >
              Download Signed Contract
            </a>
          )}
        </div>
      </div>
    )
  }

  const isExpired = new Date(contract.expires_at) < new Date()

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-red-600">SON2 LATIN MUSIC</h1>
          <h2 className="text-xl md:text-2xl mb-4">Contract Signing</h2>
          <p className="text-gray-400">Contract #{contract.quote_id}</p>
          <p className="text-gray-500 text-sm">Expires: {new Date(contract.expires_at).toLocaleDateString()}</p>
        </div>

        {isExpired && (
          <div className="bg-red-900 bg-opacity-20 border border-red-500 rounded-lg p-4 mb-6 text-center">
            <p className="text-red-400 font-semibold">This contract has expired</p>
          </div>
        )}

        <div className="bg-gray-800 rounded-xl p-4 md:p-6 mb-6 border border-gray-700">
          <h3 className="text-lg md:text-xl font-bold mb-4">Contract Preview</h3>
          <div className="bg-gray-900 rounded-lg p-2 md:p-4 mb-4">
            <iframe src={contract.unsigned_pdf_url} className="w-full h-64 md:h-96 rounded" title="Contract Preview" />
          </div>
          <a href={contract.unsigned_pdf_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline text-sm md:text-base">
            Open full contract in new tab
          </a>
        </div>

        {!isExpired && (
          <div className="bg-gray-800 rounded-xl p-4 md:p-6 border border-gray-700">
            <h3 className="text-lg md:text-xl font-bold mb-4">Your Signature</h3>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2 text-sm md:text-base">Please sign below by drawing your signature:</label>
              <div className="border-2 border-gray-600 rounded-lg bg-white overflow-hidden">
                <SignatureCanvas ref={sigPadRef} canvasProps={{ className: 'w-full h-32 md:h-40' }} backgroundColor="white" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => sigPadRef.current?.clear()} className="w-full sm:w-auto px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors">
                Clear Signature
              </button>
              <button onClick={handleSign} disabled={signing} className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {signing ? 'Signing Contract...' : 'Sign Contract'}
              </button>
            </div>
            <p className="text-gray-500 text-xs md:text-sm mt-4">By signing this contract, you agree to the terms and conditions outlined in the document above.</p>
          </div>
        )}
      </div>
    </div>
  )
}