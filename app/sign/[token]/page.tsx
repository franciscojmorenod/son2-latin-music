'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState, useRef, useCallback } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { CheckCircle, FileText, Loader2, XCircle } from 'lucide-react'

interface ContractData {
  id: number
  quote_id: number
  contract_token: string
  status: string
  unsigned_pdf_url: string
  signed_pdf_url: string | null
  signed_at: string | null
  signer_ip: string | null
  expires_at: string
  contract_data: any
}

export default function SignContractPage() {
  const params = useParams()
  const token = params.token as string
  
  const [contract, setContract] = useState<ContractData | null>(null)
  const [loading, setLoading] = useState(true)
  const [signing, setSigning] = useState(false)
  const [signed, setSigned] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const sigPadRef = useRef<SignatureCanvas>(null)

  const fetchContract = useCallback(async () => {
    try {
      const response = await fetch(`/api/contracts/${token}`)
      if (response.ok) {
        const data = await response.json()
        setContract(data)
        setSigned(data.status === 'signed')
      } else {
        setError('Contract not found or expired')
      }
    } catch (err) {
      setError('Failed to load contract')
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    fetchContract()
  }, [fetchContract])

  const clearSignature = () => {
    if (sigPadRef.current) {
      sigPadRef.current.clear()
    }
  }

  const handleSign = async () => {
    if (!sigPadRef.current || sigPadRef.current.isEmpty()) {
      alert('Please provide your signature')
      return
    }

    setSigning(true)
    try {
      const signatureData = sigPadRef.current.toDataURL()
      
      const response = await fetch(`/api/contracts/${token}/sign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signature: signatureData })
      })

      if (response.ok) {
        setSigned(true)
        await fetchContract()
        alert('Contract signed successfully!')
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

  const isExpired = contract ? new Date(contract.expires_at) < new Date() : false

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="animate-spin text-white" size={48} />
        </div>
      )}

      {!loading && (error || !contract) && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="max-w-md w-full bg-gray-800 rounded-xl p-8 text-center border border-red-500">
            <XCircle className="mx-auto mb-4 text-red-500" size={64} />
            <h1 className="text-2xl font-bold text-white mb-4">Contract Not Found</h1>
            <p className="text-gray-400">{error || 'This contract link is invalid or has expired.'}</p>
          </div>
        </div>
      )}

      {!loading && contract && signed && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="max-w-2xl w-full bg-gray-800 rounded-xl p-8 text-center border border-green-500">
            <CheckCircle className="mx-auto mb-4 text-green-500" size={64} />
            <h1 className="text-3xl font-bold text-white mb-4">Contract Already Signed</h1>
            <p className="text-gray-400 mb-6">
              This contract was signed on {contract.signed_at ? new Date(contract.signed_at).toLocaleString() : 'Unknown'}
            </p>
            
            {contract.signed_pdf_url && (
              
                href={contract.signed_pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
              >
                <FileText size={20} />
                Download Signed Contract
              </a>
            )}
          </div>
        </div>
      )}

      {!loading && contract && !signed && (
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 text-red-600">SON2 LATIN MUSIC</h1>
            <h2 className="text-2xl font-semibold mb-4">Contract Signing</h2>
            <p className="text-gray-400">
              Contract #{contract.quote_id} • Expires: {new Date(contract.expires_at).toLocaleDateString()}
            </p>
          </div>

          {isExpired && (
            <div className="bg-red-900 bg-opacity-20 border border-red-500 rounded-lg p-4 mb-6 text-center">
              <p className="text-red-400 font-semibold">This contract has expired</p>
            </div>
          )}

          <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FileText className="text-red-600" />
              Contract Preview
            </h3>
            
            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <iframe
                src={contract.unsigned_pdf_url}
                className="w-full h-96 rounded"
                title="Contract Preview"
              />
            </div>

            
              href={contract.unsigned_pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Open full contract in new tab
            </a>
          </div>

          {!isExpired && (
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4">Your Signature</h3>
              
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">
                  Please sign below by drawing your signature:
                </label>
                <div className="border-2 border-gray-600 rounded-lg bg-white">
                  <SignatureCanvas
                    ref={sigPadRef}
                    canvasProps={{
                      className: 'w-full h-40 rounded-lg',
                    }}
                    backgroundColor="white"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={clearSignature}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
                >
                  Clear Signature
                </button>
                
                <button
                  onClick={handleSign}
                  disabled={signing}
                  className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {signing ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Signing Contract...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      Sign Contract
                    </>
                  )}
                </button>
              </div>

              <p className="text-gray-500 text-sm mt-4">
                By signing this contract, you agree to the terms and conditions outlined in the document above.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}