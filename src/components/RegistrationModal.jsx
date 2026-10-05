import React, { useState, useEffect } from 'react';

export const isGoogleDriveUrl = (url) => {
  if (!url || !url.trim()) return false;
  const trimmed = url.trim();
  const pattern = /^https?:\/\/(www\.)?(drive|docs)\.google\.com\/.+/i;
  return pattern.test(trimmed);
};

export const INSTITUTION_OPTIONS = [
  'Trichy SRM Medical College Hospital & Research Centre',
  'Trichy SRM Allied Health Science',
  'SRM TRP Engineering College',
  'SRM Trichy College of Nursing',
  'SRM Trichy Arts & Science College',
  'SRM Institute of Science and Technology, Tiruchirapalli',
  'SRM Ramapuram'
];

export const SRM_IST_SUB_INSTITUTES = [
  'Engineering and Technology',
  'Physiotherapy',
  'Allied Health Sciences',
  'Science and Humanities',
  'Occupational Therapy'
];

const RegistrationModal = ({ isOpen, onClose, prefilledProblem }) => {
  if (!isOpen) return null;

  const [activeStep, setActiveStep] = useState(1);

  const [formData, setFormData] = useState({
    hackathonName: 'Medaithon 2026',
    teamName: '',
    selectedProblemStatement: 'PS1: Autonomous Sterilization Verification System for Reusable Surgical Instruments (Hardware)',
    abstractDriveLink: '',
    teamLeader: {
      fullName: '', age: '', gender: '', email: '', mobileNumber: '',
      institutionName: '', subInstitute: '', department: '', yearOfStudy: '', cityState: '',
      participantType: 'Engineering Student', studentId: ''
    },
    teamMembers: [
      { fullName: '', age: '', gender: '', email: '', mobileNumber: '', institutionName: '', subInstitute: '', department: '', yearOfStudy: '', participantType: 'Engineering Student', studentId: '' },
      { fullName: '', age: '', gender: '', email: '', mobileNumber: '', institutionName: '', subInstitute: '', department: '', yearOfStudy: '', participantType: 'Engineering Student', studentId: '' }
    ],
    declarationsAccepted: false
  });

  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [registrationId, setRegistrationId] = useState('');
  const [lastSubmission, setLastSubmission] = useState(null);

  const PROBLEM_OPTIONS = [
    'PS1: Autonomous Sterilization Verification System for Reusable Surgical Instruments (Hardware)',
    'PS2: Self-Healing Medication Administration Record System for High-Acuity Care (Software & Automation)',
    'PS3: Synthetic Rare-Disease Patient Avatars for Clinical Training and Decision Support (Generative AI)',
    'PS4: Multimodal Early Detection of Postoperative Delirium From Non-Neurological Signals (AI in Diagnostics)',
    'PS5: Closed-Loop Wearable for Early Detection and Mitigation of Vasovagal Syncope (Wearable Computing)',
  ];

  useEffect(() => {
    if (prefilledProblem) {
      const match = PROBLEM_OPTIONS.find(opt => opt.startsWith(prefilledProblem.id))
      if (match) {
        setFormData(prev => ({ ...prev, selectedProblemStatement: match }))
      }
    }
  }, [prefilledProblem])

  const handleLeaderChange = (e) => {
    const { name, value } = e.target;
    if (name === 'institutionName') {
      setFormData(prev => ({
        ...prev,
        teamLeader: {
          ...prev.teamLeader,
          institutionName: value,
          subInstitute: value === 'SRM Institute of Science and Technology, Tiruchirapalli' ? prev.teamLeader.subInstitute : ''
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        teamLeader: { ...prev.teamLeader, [name]: value }
      }));
    }
  };

  const handleMemberChange = (index, e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newMembers = [...prev.teamMembers];
      if (name === 'institutionName') {
        newMembers[index] = {
          ...newMembers[index],
          institutionName: value,
          subInstitute: value === 'SRM Institute of Science and Technology, Tiruchirapalli' ? newMembers[index].subInstitute : ''
        };
      } else {
        newMembers[index] = { ...newMembers[index], [name]: value };
      }
      return { ...prev, teamMembers: newMembers };
    });
  };

  const handleStep1Next = () => {
    if (!formData.teamName || !formData.teamName.trim()) {
      setErrorMessage('Please enter your team name.');
      return;
    }
    if (!formData.abstractDriveLink || !formData.abstractDriveLink.trim()) {
      setErrorMessage('Please provide the Google Drive link for your solution abstract PPT.');
      return;
    }
    if (!isGoogleDriveUrl(formData.abstractDriveLink)) {
      setErrorMessage('Invalid Google Drive URL. Please enter a valid Google Drive link (e.g., https://drive.google.com/file/d/...).');
      return;
    }
    setErrorMessage('');
    setActiveStep(2);
  };

  const handleStep2Next = () => {
    const leader = formData.teamLeader;
    if (leader.institutionName === 'SRM Institute of Science and Technology, Tiruchirapalli' && !leader.subInstitute) {
      setErrorMessage('Please select the specific institute under SRM Institute of Science and Technology for the Team Leader.');
      return;
    }
    setErrorMessage('');
    setActiveStep(3);
  };

  const handleStep3Next = () => {
    for (let i = 0; i < formData.teamMembers.length; i++) {
      const m = formData.teamMembers[i];
      if (m.institutionName === 'SRM Institute of Science and Technology, Tiruchirapalli' && !m.subInstitute) {
        setErrorMessage(`Please select the specific institute under SRM Institute of Science and Technology for Member ${i + 1}.`);
        return;
      }
    }
    setErrorMessage('');
    setActiveStep(4);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // Frontend Validations
    if (!formData.declarationsAccepted) {
      setStatus('error');
      setErrorMessage('You must accept the declarations to register.');
      return;
    }

    if (!formData.abstractDriveLink || !formData.abstractDriveLink.trim()) {
      setStatus('error');
      setErrorMessage('Please provide the Google Drive link for your solution abstract PPT.');
      return;
    }

    if (!isGoogleDriveUrl(formData.abstractDriveLink)) {
      setStatus('error');
      setErrorMessage('Invalid Google Drive URL. Please enter a valid Google Drive link (e.g., https://drive.google.com/file/d/...).');
      return;
    }

    // Institution validations
    if (formData.teamLeader.institutionName === 'SRM Institute of Science and Technology, Tiruchirapalli' && !formData.teamLeader.subInstitute) {
      setStatus('error');
      setErrorMessage('Please select the specific institute under SRM Institute of Science and Technology for the Team Leader.');
      return;
    }

    for (let i = 0; i < formData.teamMembers.length; i++) {
      const m = formData.teamMembers[i];
      if (m.institutionName === 'SRM Institute of Science and Technology, Tiruchirapalli' && !m.subInstitute) {
        setStatus('error');
        setErrorMessage(`Please select the specific institute under SRM Institute of Science and Technology for Member ${i + 1}.`);
        return;
      }
    }

    const allParticipants = [formData.teamLeader, ...formData.teamMembers];
    const hasFemale = allParticipants.some(p => p && p.gender && p.gender.trim().toLowerCase() === 'female');

    if (!hasFemale) {
      setStatus('error');
      setErrorMessage('Team must include at least one female member among your 3 registered engineering students.');
      return;
    }

    const formatParticipant = (p) => {
      let finalInstitution = p.institutionName;
      if (p.institutionName === 'SRM Institute of Science and Technology, Tiruchirapalli' && p.subInstitute) {
        finalInstitution = `SRM Institute of Science and Technology, Tiruchirapalli (${p.subInstitute})`;
      }
      return {
        ...p,
        age: Number(p.age),
        institutionName: finalInstitution,
        subInstitute: p.subInstitute || '',
        participantType: 'Engineering Student'
      };
    };

    const generatedRegId = 'MED2026-' + Math.random().toString(36).substring(2, 8).toUpperCase();

    // Convert ages and format institutions before submitting
    const payload = {
      ...formData,
      registrationId: generatedRegId,
      teamLeader: formatParticipant(formData.teamLeader),
      teamMembers: formData.teamMembers.map(formatParticipant),
      onSiteProvidedMembers: [
        { role: 'MBBS Student', providedBy: 'MEDAITHON Organizers (On-Site)' },
        { role: 'Nursing Student', providedBy: 'MEDAITHON Organizers (On-Site)' }
      ],
      submissionDate: new Date().toISOString()
    };

    try {
      // 1. Post registration payload to MongoDB serverless endpoint (/api/register)
      try {
        const apiResponse = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const resData = await apiResponse.json();
        if (!apiResponse.ok || !resData.success) {
          console.warn('MongoDB Registration API Notice:', resData?.error || 'Could not connect to MongoDB serverless function');
        }
      } catch (apiErr) {
        console.warn('Network request to MongoDB API failed, proceeding with local fallback:', apiErr);
      }

      // 2. Backup in localStorage for redundancy
      const existing = JSON.parse(localStorage.getItem('medaithon_registrations') || '[]');
      existing.push(payload);
      localStorage.setItem('medaithon_registrations', JSON.stringify(existing));

      setRegistrationId(generatedRegId);
      setLastSubmission(payload);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage('An error occurred during registration: ' + (err.message || 'Unknown error'));
    }
  };

  const downloadReceipt = () => {
    if (!lastSubmission) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(lastSubmission, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `MEDAITHON_Registration_${lastSubmission.registrationId}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const STEPS = [
    { id: 1, name: 'Team & Abstract' },
    { id: 2, name: 'Team Leader' },
    { id: 3, name: 'Team Members (2)' },
    { id: 4, name: 'Submit' },
  ];

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 backdrop-blur-md overflow-y-auto p-4 sm:p-6">
      <div className="glass-card border border-white/20 rounded-3xl p-6 sm:p-8 max-w-4xl w-full text-white my-auto max-h-[90vh] overflow-y-auto shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
        
        {/* Header Bar */}
        <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-6">
          <div>
            <span className="text-xs font-mono text-white/60 tracking-widest uppercase">● REGISTRATION FORM</span>
            <h2 className="text-3xl font-['Bebas_Neue'] tracking-wide text-white m-0">MEDAITHON 2026 REGISTRATION</h2>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black text-white text-xl flex items-center justify-center transition-colors cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Step Progress Indicator */}
        <div className="mb-8 grid grid-cols-4 gap-2 border-b border-white/10 pb-4">
          {STEPS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveStep(s.id)}
              className={`flex flex-col sm:flex-row items-center justify-center gap-2 p-2 rounded-xl text-xs font-bold transition-all ${activeStep === s.id ? 'bg-white text-black shadow-md font-bold' : 'bg-white/5 text-neutral-400 hover:bg-white/10'}`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${activeStep === s.id ? 'bg-black text-white font-bold' : 'bg-white/10 text-white'}`}>
                {s.id}
              </span>
              <span className="truncate hidden sm:inline">{s.name}</span>
            </button>
          ))}
        </div>

        {status === 'success' ? (
          <div className="text-center py-12 space-y-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-white/10 border border-white/30 rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-['Bebas_Neue'] text-white tracking-wide m-0">REGISTRATION SUCCESSFUL!</h3>
            <div className="inline-block bg-white/5 border border-white/20 px-4 py-2 rounded-xl">
              <span className="text-xs text-neutral-400 font-mono block">YOUR REGISTRATION ID</span>
              <span className="text-lg font-bold font-mono text-white tracking-wider">{registrationId}</span>
            </div>
            <p className="text-neutral-300 max-w-md mx-auto text-sm font-['Inter'] leading-relaxed">
              Your team <strong>{lastSubmission?.teamName}</strong> (3 Registered Members) has been registered for MEDAITHON 2026.<br />
              <span className="text-xs text-white/80 block mt-2 bg-white/5 p-2 rounded-lg border border-white/10">
                🏥 <strong>1 MBBS Student</strong> and <strong>1 Nursing Student</strong> will be allocated to your team on-site by organizers.
              </span>
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <button onClick={downloadReceipt} type="button" className="inline-flex items-center gap-2 bg-white hover:bg-neutral-200 text-black font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider cursor-pointer shadow-[0_4px_15px_rgba(255,255,255,0.2)] transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Confirmation Receipt</span>
              </button>
              <button onClick={onClose} type="button" className="bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider cursor-pointer transition-all">
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 font-['Inter'] text-sm">

            {/* Step 1: Team & Abstract Details */}
            {activeStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Team Composition Notice */}
                <div className="bg-white/5 border border-white/20 rounded-2xl p-4 flex items-start gap-3 shadow-md">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="space-y-1 text-xs">
                    <h4 className="font-bold text-white text-sm m-0">Team Composition Rules</h4>
                    <p className="text-neutral-300 m-0 leading-relaxed">
                      • <strong>Only 3 Members Can Register:</strong> Register exactly 3 members (1 Team Leader + Member 1 + Member 2) online.<br />
                      • <strong>Medical & Nursing Allotment (On-Site):</strong> <strong>1 MBBS Student</strong> and <strong>1 Nursing Student</strong> will be provided to your team on-site by MEDAITHON organizers.<br />
                      • <strong>Mandatory Female Member:</strong> At least 1 female member must be included in your registered team roster.
                    </p>
                  </div>
                </div>

                {/* Abstract PPT Template Callout */}
                <div className="bg-white/5 border border-white/15 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-sm m-0">Solution Abstract Template v2.0 (.pptx)</h4>
                        <span className="bg-white/20 border border-white/30 text-white text-[9px] font-bold px-1.5 py-0.5 rounded font-mono">NEW v2</span>
                      </div>
                      <p className="text-xs text-neutral-400 m-0 leading-relaxed">Download the updated official template (v2.0) required to prepare your solution abstract before submitting below.</p>
                    </div>
                  </div>
                  <a
                    href="/ppt_template/MEDAITHON_Team_Template-2.pptx"
                    download="MEDAITHON_Team_Template-2.pptx"
                    className="inline-flex items-center gap-2 bg-white hover:bg-neutral-200 text-black font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all flex-shrink-0 shadow-[0_0_12px_rgba(255,255,255,0.2)] hover:scale-105 cursor-pointer"
                  >
                    <span>Download v2.0</span>
                    <span>↓</span>
                  </a>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2 flex items-center gap-2">
                    <span>1.</span>
                    <span>Team & Abstract Details</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1.5 text-xs text-neutral-400 font-semibold">Team Name *</label>
                      <input required type="text" placeholder="Enter your team name" value={formData.teamName} onChange={e => setFormData({ ...formData, teamName: e.target.value })} className="w-full bg-white/5 rounded-xl p-3 text-white border border-white/10 focus:border-white outline-none" />
                    </div>
                    <div>
                      <label className="block mb-1.5 text-xs text-neutral-400 font-semibold">Selected Problem Statement *</label>
                      <select required value={formData.selectedProblemStatement} onChange={e => setFormData({ ...formData, selectedProblemStatement: e.target.value })} className="w-full bg-[#121216] rounded-xl p-3 text-white border border-white/10 focus:border-white outline-none">
                        {PROBLEM_OPTIONS.map((opt, idx) => (
                          <option key={idx} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block mb-1.5 text-xs text-neutral-400 font-semibold">Solution Abstract Google Drive Link *</label>
                      <input 
                        required 
                        type="url" 
                        placeholder="https://drive.google.com/file/d/... or folder link" 
                        value={formData.abstractDriveLink} 
                        onChange={e => setFormData({ ...formData, abstractDriveLink: e.target.value })} 
                        className={`w-full bg-white/5 rounded-xl p-3 text-white border transition-colors outline-none ${
                          formData.abstractDriveLink.trim()
                            ? (isGoogleDriveUrl(formData.abstractDriveLink)
                              ? 'border-white/70 focus:border-white'
                              : 'border-red-400 focus:border-red-400')
                            : 'border-white/10 focus:border-white'
                        }`}
                      />
                      {formData.abstractDriveLink.trim() && !isGoogleDriveUrl(formData.abstractDriveLink) && (
                        <p className="text-xs text-red-400 mt-1.5 font-semibold flex items-center gap-1.5">
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Invalid URL. Must be a valid Google Drive link (e.g., https://drive.google.com/...).</span>
                        </p>
                      )}
                      {formData.abstractDriveLink.trim() && isGoogleDriveUrl(formData.abstractDriveLink) && (
                        <p className="text-xs text-white/90 mt-1.5 font-semibold flex items-center gap-1.5">
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Valid Google Drive link recognized.</span>
                        </p>
                      )}
                      <p className="text-xs text-neutral-300 mt-2 leading-relaxed bg-white/5 border border-white/15 p-2.5 rounded-lg flex items-start gap-2">
                        <svg className="w-4 h-4 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>Please upload your completed abstract (prepared using the downloaded PPT template) to Google Drive and paste the link here. Set link sharing to <strong>"Anyone with the link can view"</strong>.</span>
                      </p>
                    </div>
                  </div>
                </div>

                {errorMessage && activeStep === 1 && (
                  <div className="p-3 bg-red-950/80 border border-red-500 rounded-xl text-red-200 text-xs">{errorMessage}</div>
                )}

                <div className="flex justify-end pt-4">
                  <button type="button" onClick={handleStep1Next} className="bg-white hover:bg-neutral-200 text-black font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider cursor-pointer transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    Next: Team Leader →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Team Leader Details */}
            {activeStep === 2 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2 flex items-center gap-2">
                  <span>2.</span>
                  <span>Team Leader Details</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block mb-1 text-xs text-neutral-400">Full Name *</label>
                    <input required name="fullName" placeholder="Full Name" value={formData.teamLeader.fullName} onChange={handleLeaderChange} className="w-full bg-white/5 rounded-xl p-3 border border-white/10 focus:border-white outline-none" />
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-neutral-400">Age *</label>
                    <input required type="number" name="age" placeholder="Age" value={formData.teamLeader.age} onChange={handleLeaderChange} className="w-full bg-white/5 rounded-xl p-3 border border-white/10 focus:border-white outline-none" />
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-neutral-400">Gender *</label>
                    <select required name="gender" value={formData.teamLeader.gender} onChange={handleLeaderChange} className="w-full bg-[#121216] rounded-xl p-3 border border-white/10 text-white focus:border-white outline-none">
                      <option value="" disabled>Select Gender</option><option>Male</option><option>Female</option><option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-neutral-400">Email *</label>
                    <input required type="email" name="email" placeholder="Email Address" value={formData.teamLeader.email} onChange={handleLeaderChange} className="w-full bg-white/5 rounded-xl p-3 border border-white/10 focus:border-white outline-none" />
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-neutral-400">Mobile Number *</label>
                    <input required name="mobileNumber" placeholder="Mobile Number" value={formData.teamLeader.mobileNumber} onChange={handleLeaderChange} className="w-full bg-white/5 rounded-xl p-3 border border-white/10 focus:border-white outline-none" />
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-neutral-400 font-semibold">Institution / College Name *</label>
                    <input 
                      required 
                      type="text"
                      name="institutionName" 
                      placeholder="Enter Institution / College Name" 
                      value={formData.teamLeader.institutionName} 
                      onChange={handleLeaderChange} 
                      className="w-full bg-white/5 rounded-xl p-3 border border-white/10 text-white focus:border-white outline-none" 
                    />
                  </div>

                  {formData.teamLeader.institutionName === 'SRM Institute of Science and Technology, Tiruchirapalli' && (
                    <div className="animate-in fade-in duration-200">
                      <label className="block mb-1 text-xs text-white font-semibold">Institute under SRM IST *</label>
                      <select
                        required
                        name="subInstitute"
                        value={formData.teamLeader.subInstitute || ''}
                        onChange={handleLeaderChange}
                        className="w-full bg-[#121216] rounded-xl p-3 border border-white/60 text-white focus:border-white outline-none shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                      >
                        <option value="" disabled>Select Institute under SRM IST</option>
                        {SRM_IST_SUB_INSTITUTES.map((sub, idx) => (
                          <option key={idx} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div>
                    <label className="block mb-1 text-xs text-neutral-400">Department *</label>
                    <input required name="department" placeholder="Department" value={formData.teamLeader.department} onChange={handleLeaderChange} className="w-full bg-white/5 rounded-xl p-3 border border-white/10 focus:border-white outline-none" />
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-neutral-400">Year of Study *</label>
                    <input required name="yearOfStudy" placeholder="Year of Study" value={formData.teamLeader.yearOfStudy} onChange={handleLeaderChange} className="w-full bg-white/5 rounded-xl p-3 border border-white/10 focus:border-white outline-none" />
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-neutral-400">City / State *</label>
                    <input required name="cityState" placeholder="City / State" value={formData.teamLeader.cityState} onChange={handleLeaderChange} className="w-full bg-white/5 rounded-xl p-3 border border-white/10 focus:border-white outline-none" />
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-neutral-400 font-semibold">Participant Type *</label>
                    <select required name="participantType" value={formData.teamLeader.participantType} onChange={handleLeaderChange} className="w-full bg-[#121216] rounded-xl p-3 border border-white/10 text-white focus:border-white outline-none">
                      <option value="Engineering Student">Engineering Student</option>
                      <option value="Medical Student">Medical Student</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-neutral-400">Student ID (Optional)</label>
                    <input name="studentId" placeholder="Student ID" value={formData.teamLeader.studentId} onChange={handleLeaderChange} className="w-full bg-white/5 rounded-xl p-3 border border-white/10 focus:border-white outline-none" />
                  </div>
                </div>

                {errorMessage && activeStep === 2 && (
                  <div className="p-3 bg-red-950/80 border border-red-500 rounded-xl text-red-200 text-xs">{errorMessage}</div>
                )}

                <div className="flex justify-between pt-4">
                  <button type="button" onClick={() => { setErrorMessage(''); setActiveStep(1); }} className="px-6 py-2.5 rounded-full border border-white/20 text-neutral-300 hover:text-white text-xs uppercase tracking-wider cursor-pointer">
                    ← Back
                  </button>
                  <button type="button" onClick={handleStep2Next} className="bg-white hover:bg-neutral-200 text-black font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider cursor-pointer transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    Next: Team Members →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Team Members Details */}
            {activeStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex justify-between items-end border-b border-white/10 pb-2">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>3.</span>
                    <span>Team Members (Member 1 & Member 2)</span>
                  </h3>
                </div>
                <div className="bg-white/5 border border-white/20 p-4 rounded-2xl flex items-start gap-3 text-xs text-neutral-300">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="space-y-1">
                    <p className="m-0 font-bold text-white">Registered Team Composition Rule</p>
                    <p className="m-0 leading-relaxed">
                      Exactly <strong>3 Members</strong> (1 Leader + 2 Members) can be registered in this form.<br />
                      <strong>1 MBBS Student</strong> and <strong>1 Nursing Student</strong> will be assigned to your team on-site by MEDAITHON organizers. At least 1 female member is mandatory in your registered team.
                    </p>
                  </div>
                </div>

                {formData.teamMembers.map((member, index) => (
                  <div key={index} className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-4 relative">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <h4 className="font-bold text-white">Member {index + 1}</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block mb-1 text-xs text-neutral-400">Full Name *</label>
                        <input required name="fullName" placeholder="Full Name" value={member.fullName} onChange={(e) => handleMemberChange(index, e)} className="w-full bg-white/5 rounded-xl p-2.5 border border-white/10 focus:border-white outline-none" />
                      </div>
                      <div>
                        <label className="block mb-1 text-xs text-neutral-400">Age *</label>
                        <input required type="number" name="age" placeholder="Age" value={member.age} onChange={(e) => handleMemberChange(index, e)} className="w-full bg-white/5 rounded-xl p-2.5 border border-white/10 focus:border-white outline-none" />
                      </div>
                      <div>
                        <label className="block mb-1 text-xs text-neutral-400">Gender *</label>
                        <select required name="gender" value={member.gender} onChange={(e) => handleMemberChange(index, e)} className="w-full bg-[#121216] rounded-xl p-2.5 border border-white/10 text-white focus:border-white outline-none">
                          <option value="" disabled>Gender</option><option>Male</option><option>Female</option><option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block mb-1 text-xs text-neutral-400">Email *</label>
                        <input required type="email" name="email" placeholder="Email" value={member.email} onChange={(e) => handleMemberChange(index, e)} className="w-full bg-white/5 rounded-xl p-2.5 border border-white/10 focus:border-white outline-none" />
                      </div>
                      <div>
                        <label className="block mb-1 text-xs text-neutral-400">Mobile Number *</label>
                        <input required name="mobileNumber" placeholder="Mobile Number" value={member.mobileNumber} onChange={(e) => handleMemberChange(index, e)} className="w-full bg-white/5 rounded-xl p-2.5 border border-white/10 focus:border-white outline-none" />
                      </div>
                      <div>
                        <label className="block mb-1 text-xs text-neutral-400 font-semibold">Institution / College Name *</label>
                        <input 
                          required 
                          type="text"
                          name="institutionName" 
                          placeholder="Enter Institution / College Name" 
                          value={member.institutionName} 
                          onChange={(e) => handleMemberChange(index, e)} 
                          className="w-full bg-white/5 rounded-xl p-2.5 border border-white/10 text-white focus:border-white outline-none" 
                        />
                      </div>

                      {member.institutionName === 'SRM Institute of Science and Technology, Tiruchirapalli' && (
                        <div className="animate-in fade-in duration-200">
                          <label className="block mb-1 text-xs text-white font-semibold">Institute under SRM IST *</label>
                          <select
                            required
                            name="subInstitute"
                            value={member.subInstitute || ''}
                            onChange={(e) => handleMemberChange(index, e)}
                            className="w-full bg-[#121216] rounded-xl p-2.5 border border-white/60 text-white focus:border-white outline-none shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                          >
                            <option value="" disabled>Select Institute under SRM IST</option>
                            {SRM_IST_SUB_INSTITUTES.map((sub, idx) => (
                              <option key={idx} value={sub}>{sub}</option>
                            ))}
                          </select>
                        </div>
                      )}
                      <div>
                        <label className="block mb-1 text-xs text-neutral-400">Department *</label>
                        <input required name="department" placeholder="Department" value={member.department} onChange={(e) => handleMemberChange(index, e)} className="w-full bg-white/5 rounded-xl p-2.5 border border-white/10 focus:border-white outline-none" />
                      </div>
                      <div>
                        <label className="block mb-1 text-xs text-neutral-400">Year of Study *</label>
                        <input required name="yearOfStudy" placeholder="Year of Study" value={member.yearOfStudy} onChange={(e) => handleMemberChange(index, e)} className="w-full bg-white/5 rounded-xl p-2.5 border border-white/10 focus:border-white outline-none" />
                      </div>
                      <div>
                        <label className="block mb-1 text-xs text-neutral-400 font-semibold">Participant Type *</label>
                        <select required name="participantType" value={member.participantType} onChange={(e) => handleMemberChange(index, e)} className="w-full bg-[#121216] rounded-xl p-2.5 border border-white/10 text-white focus:border-white outline-none">
                          <option value="Engineering Student">Engineering Student</option>
                          <option value="Medical Student">Medical Student</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}

                {errorMessage && activeStep === 3 && (
                  <div className="p-3 bg-red-950/80 border border-red-500 rounded-xl text-red-200 text-xs">{errorMessage}</div>
                )}

                <div className="flex justify-between pt-4">
                  <button type="button" onClick={() => { setErrorMessage(''); setActiveStep(2); }} className="px-6 py-2.5 rounded-full border border-white/20 text-neutral-300 hover:text-white text-xs uppercase tracking-wider cursor-pointer">
                    ← Back
                  </button>
                  <button type="button" onClick={handleStep3Next} className="bg-white hover:bg-neutral-200 text-black font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider cursor-pointer transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    Next: Review & Submit →
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {activeStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2 flex items-center gap-2">
                  <span>4.</span>
                  <span>Declarations & Submit</span>
                </h3>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 text-xs text-neutral-300">
                  <p><strong>Team Name:</strong> {formData.teamName || 'Not entered yet'}</p>
                  <p><strong>Problem Statement:</strong> {formData.selectedProblemStatement}</p>
                  <p><strong>Abstract Link:</strong> {formData.abstractDriveLink || 'Not entered yet'}</p>
                  <p><strong>Online Registered Members:</strong> 3 Members (1 Team Leader + Member 1 + Member 2)</p>
                  <p><strong>On-Site Allotted Members:</strong> 1 MBBS Student + 1 Nursing Student (Provided by Organizers)</p>
                </div>

                <div className="space-y-4 bg-white/5 border border-white/15 p-4 rounded-2xl">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input required type="checkbox" checked={formData.declarationsAccepted} onChange={(e) => setFormData({ ...formData, declarationsAccepted: e.target.checked })} className="mt-1 w-4 h-4 accent-white" />
                    <span className="text-neutral-300 text-xs leading-relaxed">
                      I confirm all information provided is accurate. Our team consists of 3 registered members (including at least 1 female member), and we understand 1 MBBS student and 1 Nursing student will be provided to our team on-site by MEDAITHON organizers.
                    </span>
                  </label>
                </div>

                {errorMessage && <div className="p-3 bg-red-950/80 border border-red-500 rounded-xl text-red-200 text-xs">{errorMessage}</div>}

                <div className="pt-4 flex justify-between items-center">
                  <button type="button" onClick={() => setActiveStep(3)} className="px-6 py-2.5 rounded-full border border-white/20 text-neutral-300 hover:text-white text-xs uppercase tracking-wider cursor-pointer">
                    ← Back
                  </button>
                  <button type="submit" disabled={status === 'loading'} className="bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-neutral-200 disabled:opacity-50 text-xs uppercase tracking-widest shadow-[0_4px_20px_rgba(255,255,255,0.25)] cursor-pointer transition-all">
                    {status === 'loading' ? 'Submitting Registration...' : 'Submit Registration →'}
                  </button>
                </div>
              </div>
            )}

          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationModal;
