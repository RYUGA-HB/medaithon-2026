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

  const addMember = () => {
    if (formData.teamMembers.length < 4) {
      setFormData(prev => ({
        ...prev,
        teamMembers: [
          ...prev.teamMembers,
          { fullName: '', age: '', gender: '', email: '', mobileNumber: '', institutionName: '', subInstitute: '', department: '', yearOfStudy: '', participantType: 'Other', studentId: '' }
        ]
      }));
    }
  };

  const removeMember = (index) => {
    if (formData.teamMembers.length > 2) {
      setFormData(prev => ({
        ...prev,
        teamMembers: prev.teamMembers.filter((_, i) => i !== index)
      }));
    }
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
      setErrorMessage('Team must include at least one female member.');
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
        subInstitute: p.subInstitute || ''
      };
    };

    const generatedRegId = 'MED2026-' + Math.random().toString(36).substring(2, 8).toUpperCase();

    // Convert ages and format institutions before submitting
    const payload = {
      ...formData,
      registrationId: generatedRegId,
      teamLeader: formatParticipant(formData.teamLeader),
      teamMembers: formData.teamMembers.map(formatParticipant),
      submissionDate: new Date().toISOString()
    };

    try {
      // Store in localStorage for frontend-only mode
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
    { id: 3, name: 'Team Members' },
    { id: 4, name: 'Submit' },
  ];

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 backdrop-blur-md overflow-y-auto p-4 sm:p-6">
      <div className="bg-gradient-to-b from-[#141420] via-[#0d0d14] to-[#09090f] border border-[#dc2626]/40 rounded-3xl p-6 sm:p-8 max-w-4xl w-full text-white my-auto max-h-[90vh] overflow-y-auto shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
        
        {/* Header Bar */}
        <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-6">
          <div>
            <span className="text-xs font-mono text-[#f59e0b] tracking-widest uppercase">● REGISTRATION FORM</span>
            <h2 className="text-3xl font-['Bebas_Neue'] tracking-wide text-[#f0e6d3] m-0">MEDAITHON 2026 REGISTRATION</h2>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-[#dc2626] text-white text-xl flex items-center justify-center transition-colors cursor-pointer"
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
              className={`flex flex-col sm:flex-row items-center justify-center gap-2 p-2 rounded-xl text-xs font-bold transition-all ${activeStep === s.id ? 'bg-[#f59e0b] text-[#0a0a0f] shadow-md' : 'bg-white/5 text-[#a8a29e] hover:bg-white/10'}`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${activeStep === s.id ? 'bg-[#0a0a0f] text-[#f59e0b]' : 'bg-white/10 text-white'}`}>
                {s.id}
              </span>
              <span className="truncate hidden sm:inline">{s.name}</span>
            </button>
          ))}
        </div>

        {status === 'success' ? (
          <div className="text-center py-12 space-y-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500 rounded-full flex items-center justify-center mx-auto text-3xl text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              ✓
            </div>
            <h3 className="text-3xl font-['Bebas_Neue'] text-emerald-400 tracking-wide m-0">REGISTRATION SUCCESSFUL!</h3>
            <div className="inline-block bg-emerald-950/60 border border-emerald-500/40 px-4 py-2 rounded-xl">
              <span className="text-xs text-gray-400 font-mono block">YOUR REGISTRATION ID</span>
              <span className="text-lg font-bold font-mono text-emerald-300 tracking-wider">{registrationId}</span>
            </div>
            <p className="text-[#a8a29e] max-w-md mx-auto text-sm font-['Inter'] leading-relaxed">
              Your team <strong>{lastSubmission?.teamName}</strong> has been registered for MEDAITHON 2026. Keep your Registration ID for future reference.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <button onClick={downloadReceipt} type="button" className="bg-[#f59e0b] hover:bg-[#d97706] text-[#0a0a0f] font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider cursor-pointer shadow-[0_4px_15px_rgba(245,158,11,0.3)] transition-all">
                📥 Download Confirmation Receipt
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
                {/* Abstract PPT Template Callout */}
                <div className="bg-gradient-to-r from-[#1a1a2e] to-[#12121d] border border-[#f59e0b]/40 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl flex-shrink-0">📑</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-[#f59e0b] text-sm m-0">Solution Abstract Template v2.0 (.pptx)</h4>
                        <span className="bg-[#dc2626] text-white text-[9px] font-bold px-1.5 py-0.5 rounded font-mono">NEW v2</span>
                      </div>
                      <p className="text-xs text-gray-400 m-0 leading-relaxed">Download the updated official template (v2.0) required to prepare your solution abstract before submitting below.</p>
                    </div>
                  </div>
                  <a
                    href="/ppt_template/MEDAITHON_Team_Template-2.pptx"
                    download="MEDAITHON_Team_Template-2.pptx"
                    className="inline-flex items-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-[#0a0a0f] font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all flex-shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.25)] hover:scale-105 cursor-pointer"
                  >
                    <span>Download v2.0</span>
                    <span>↓</span>
                  </a>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[#f59e0b] border-b border-white/10 pb-2 flex items-center gap-2">
                    <span>1.</span>
                    <span>Team & Abstract Details</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1.5 text-xs text-[#a8a29e] font-semibold">Team Name *</label>
                      <input required type="text" placeholder="Enter your team name" value={formData.teamName} onChange={e => setFormData({ ...formData, teamName: e.target.value })} className="w-full bg-[#161622] rounded-xl p-3 text-white border border-white/10 focus:border-[#f59e0b] outline-none" />
                    </div>
                    <div>
                      <label className="block mb-1.5 text-xs text-[#a8a29e] font-semibold">Selected Problem Statement *</label>
                      <select required value={formData.selectedProblemStatement} onChange={e => setFormData({ ...formData, selectedProblemStatement: e.target.value })} className="w-full bg-[#161622] rounded-xl p-3 text-white border border-white/10 focus:border-[#f59e0b] outline-none">
                        {PROBLEM_OPTIONS.map((opt, idx) => (
                          <option key={idx} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block mb-1.5 text-xs text-[#a8a29e] font-semibold">Solution Abstract Google Drive Link *</label>
                      <input 
                        required 
                        type="url" 
                        placeholder="https://drive.google.com/file/d/... or folder link" 
                        value={formData.abstractDriveLink} 
                        onChange={e => setFormData({ ...formData, abstractDriveLink: e.target.value })} 
                        className={`w-full bg-[#161622] rounded-xl p-3 text-white border transition-colors outline-none ${
                          formData.abstractDriveLink.trim()
                            ? (isGoogleDriveUrl(formData.abstractDriveLink)
                              ? 'border-emerald-500/70 focus:border-emerald-500'
                              : 'border-red-500 focus:border-red-500')
                            : 'border-white/10 focus:border-[#f59e0b]'
                        }`}
                      />
                      {formData.abstractDriveLink.trim() && !isGoogleDriveUrl(formData.abstractDriveLink) && (
                        <p className="text-xs text-red-400 mt-1 font-semibold flex items-center gap-1">
                          <span>❌</span> Invalid URL. Must be a valid Google Drive link (e.g., https://drive.google.com/...).
                        </p>
                      )}
                      {formData.abstractDriveLink.trim() && isGoogleDriveUrl(formData.abstractDriveLink) && (
                        <p className="text-xs text-emerald-400 mt-1 font-semibold flex items-center gap-1">
                          <span>✓</span> Valid Google Drive link recognized.
                        </p>
                      )}
                      <p className="text-xs text-amber-400/90 mt-2 leading-relaxed bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-lg">
                        ⚠️ Please upload your completed abstract (prepared using the downloaded PPT template) to Google Drive and paste the link here. Set link sharing to <strong>"Anyone with the link can view"</strong>.
                      </p>
                    </div>
                  </div>
                </div>

                {errorMessage && activeStep === 1 && (
                  <div className="p-3 bg-red-900/50 border border-red-500 rounded-xl text-red-200 text-xs">{errorMessage}</div>
                )}

                <div className="flex justify-end pt-4">
                  <button type="button" onClick={handleStep1Next} className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider cursor-pointer">
                    Next: Team Leader →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Team Leader Details */}
            {activeStep === 2 && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-[#f59e0b] border-b border-white/10 pb-2 flex items-center gap-2">
                  <span>2.</span>
                  <span>Team Leader Details</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block mb-1 text-xs text-[#a8a29e]">Full Name *</label>
                    <input required name="fullName" placeholder="Full Name" value={formData.teamLeader.fullName} onChange={handleLeaderChange} className="w-full bg-[#161622] rounded-xl p-3 border border-white/10" />
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-[#a8a29e]">Age *</label>
                    <input required type="number" name="age" placeholder="Age" value={formData.teamLeader.age} onChange={handleLeaderChange} className="w-full bg-[#161622] rounded-xl p-3 border border-white/10" />
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-[#a8a29e]">Gender *</label>
                    <select required name="gender" value={formData.teamLeader.gender} onChange={handleLeaderChange} className="w-full bg-[#161622] rounded-xl p-3 border border-white/10">
                      <option value="" disabled>Select Gender</option><option>Male</option><option>Female</option><option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-[#a8a29e]">Email *</label>
                    <input required type="email" name="email" placeholder="Email Address" value={formData.teamLeader.email} onChange={handleLeaderChange} className="w-full bg-[#161622] rounded-xl p-3 border border-white/10" />
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-[#a8a29e]">Mobile Number *</label>
                    <input required name="mobileNumber" placeholder="Mobile Number" value={formData.teamLeader.mobileNumber} onChange={handleLeaderChange} className="w-full bg-[#161622] rounded-xl p-3 border border-white/10" />
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-[#a8a29e]">Institution / College Name *</label>
                    <select 
                      required 
                      name="institutionName" 
                      value={formData.teamLeader.institutionName} 
                      onChange={handleLeaderChange} 
                      className="w-full bg-[#161622] rounded-xl p-3 border border-white/10 text-white focus:border-[#f59e0b] outline-none"
                    >
                      <option value="" disabled>Select Institution / College</option>
                      {INSTITUTION_OPTIONS.map((inst, idx) => (
                        <option key={idx} value={inst}>{inst}</option>
                      ))}
                    </select>
                  </div>

                  {formData.teamLeader.institutionName === 'SRM Institute of Science and Technology, Tiruchirapalli' && (
                    <div className="animate-in fade-in duration-200">
                      <label className="block mb-1 text-xs text-[#f59e0b] font-semibold">Institute under SRM IST *</label>
                      <select
                        required
                        name="subInstitute"
                        value={formData.teamLeader.subInstitute || ''}
                        onChange={handleLeaderChange}
                        className="w-full bg-[#161622] rounded-xl p-3 border border-[#f59e0b]/60 text-white focus:border-[#f59e0b] outline-none shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                      >
                        <option value="" disabled>Select Institute under SRM IST</option>
                        {SRM_IST_SUB_INSTITUTES.map((sub, idx) => (
                          <option key={idx} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div>
                    <label className="block mb-1 text-xs text-[#a8a29e]">Department *</label>
                    <input required name="department" placeholder="Department" value={formData.teamLeader.department} onChange={handleLeaderChange} className="w-full bg-[#161622] rounded-xl p-3 border border-white/10" />
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-[#a8a29e]">Year of Study *</label>
                    <input required name="yearOfStudy" placeholder="Year of Study" value={formData.teamLeader.yearOfStudy} onChange={handleLeaderChange} className="w-full bg-[#161622] rounded-xl p-3 border border-white/10" />
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-[#a8a29e]">City / State *</label>
                    <input required name="cityState" placeholder="City / State" value={formData.teamLeader.cityState} onChange={handleLeaderChange} className="w-full bg-[#161622] rounded-xl p-3 border border-white/10" />
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-[#a8a29e]">Participant Type *</label>
                    <select required name="participantType" value={formData.teamLeader.participantType} onChange={handleLeaderChange} className="w-full bg-[#161622] rounded-xl p-3 border border-white/10">
                      <option value="Engineering Student">Engineering Student</option>
                      <option value="Medical Student">Medical Student</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-[#a8a29e]">Student ID (Optional)</label>
                    <input name="studentId" placeholder="Student ID" value={formData.teamLeader.studentId} onChange={handleLeaderChange} className="w-full bg-[#161622] rounded-xl p-3 border border-white/10" />
                  </div>
                </div>

                {errorMessage && activeStep === 2 && (
                  <div className="p-3 bg-red-900/50 border border-red-500 rounded-xl text-red-200 text-xs">{errorMessage}</div>
                )}

                <div className="flex justify-between pt-4">
                  <button type="button" onClick={() => { setErrorMessage(''); setActiveStep(1); }} className="px-6 py-2.5 rounded-full border border-white/20 text-[#a8a29e] hover:text-white text-xs uppercase tracking-wider cursor-pointer">
                    ← Back
                  </button>
                  <button type="button" onClick={handleStep2Next} className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider cursor-pointer">
                    Next: Team Members →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Team Members Details */}
            {activeStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex justify-between items-end border-b border-white/10 pb-2">
                  <h3 className="text-lg font-bold text-[#f59e0b] flex items-center gap-2">
                    <span>3.</span>
                    <span>Team Members ({formData.teamMembers.length} added)</span>
                  </h3>
                  {formData.teamMembers.length < 4 && (
                    <button type="button" onClick={addMember} className="bg-white/10 border border-white/20 text-xs px-3 py-1.5 rounded-lg hover:bg-white/20 font-bold cursor-pointer">+ Add Member</button>
                  )}
                </div>
                <p className="text-xs text-[#a8a29e] -mt-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  ℹ️ <strong>Mandatory Rule:</strong> Teams must have 2 to 4 members. Ensure at least one female member is present across your total team roster.
                </p>

                {formData.teamMembers.map((member, index) => (
                  <div key={index} className="p-5 bg-[#141420] rounded-2xl border border-white/10 space-y-4 relative">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <h4 className="font-bold text-[#dc2626]">Member {index + 1}</h4>
                      {formData.teamMembers.length > 2 && (
                        <button type="button" onClick={() => removeMember(index)} className="text-red-400 text-xs hover:underline cursor-pointer">Remove Member</button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block mb-1 text-xs text-[#a8a29e]">Full Name *</label>
                        <input required name="fullName" placeholder="Full Name" value={member.fullName} onChange={(e) => handleMemberChange(index, e)} className="w-full bg-[#1a1a2e] rounded-xl p-2.5 border border-white/10" />
                      </div>
                      <div>
                        <label className="block mb-1 text-xs text-[#a8a29e]">Age *</label>
                        <input required type="number" name="age" placeholder="Age" value={member.age} onChange={(e) => handleMemberChange(index, e)} className="w-full bg-[#1a1a2e] rounded-xl p-2.5 border border-white/10" />
                      </div>
                      <div>
                        <label className="block mb-1 text-xs text-[#a8a29e]">Gender *</label>
                        <select required name="gender" value={member.gender} onChange={(e) => handleMemberChange(index, e)} className="w-full bg-[#1a1a2e] rounded-xl p-2.5 border border-white/10">
                          <option value="" disabled>Gender</option><option>Male</option><option>Female</option><option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block mb-1 text-xs text-[#a8a29e]">Email *</label>
                        <input required type="email" name="email" placeholder="Email" value={member.email} onChange={(e) => handleMemberChange(index, e)} className="w-full bg-[#1a1a2e] rounded-xl p-2.5 border border-white/10" />
                      </div>
                      <div>
                        <label className="block mb-1 text-xs text-[#a8a29e]">Mobile Number *</label>
                        <input required name="mobileNumber" placeholder="Mobile Number" value={member.mobileNumber} onChange={(e) => handleMemberChange(index, e)} className="w-full bg-[#1a1a2e] rounded-xl p-2.5 border border-white/10" />
                      </div>
                      <div>
                        <label className="block mb-1 text-xs text-[#a8a29e]">Institution *</label>
                        <select 
                          required 
                          name="institutionName" 
                          value={member.institutionName} 
                          onChange={(e) => handleMemberChange(index, e)} 
                          className="w-full bg-[#1a1a2e] rounded-xl p-2.5 border border-white/10 text-white focus:border-[#f59e0b] outline-none"
                        >
                          <option value="" disabled>Select Institution</option>
                          {INSTITUTION_OPTIONS.map((inst, idx) => (
                            <option key={idx} value={inst}>{inst}</option>
                          ))}
                        </select>
                      </div>

                      {member.institutionName === 'SRM Institute of Science and Technology, Tiruchirapalli' && (
                        <div className="animate-in fade-in duration-200">
                          <label className="block mb-1 text-xs text-[#f59e0b] font-semibold">Institute under SRM IST *</label>
                          <select
                            required
                            name="subInstitute"
                            value={member.subInstitute || ''}
                            onChange={(e) => handleMemberChange(index, e)}
                            className="w-full bg-[#1a1a2e] rounded-xl p-2.5 border border-[#f59e0b]/60 text-white focus:border-[#f59e0b] outline-none shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                          >
                            <option value="" disabled>Select Institute under SRM IST</option>
                            {SRM_IST_SUB_INSTITUTES.map((sub, idx) => (
                              <option key={idx} value={sub}>{sub}</option>
                            ))}
                          </select>
                        </div>
                      )}
                      <div>
                        <label className="block mb-1 text-xs text-[#a8a29e]">Department *</label>
                        <input required name="department" placeholder="Department" value={member.department} onChange={(e) => handleMemberChange(index, e)} className="w-full bg-[#1a1a2e] rounded-xl p-2.5 border border-white/10" />
                      </div>
                      <div>
                        <label className="block mb-1 text-xs text-[#a8a29e]">Year of Study *</label>
                        <input required name="yearOfStudy" placeholder="Year of Study" value={member.yearOfStudy} onChange={(e) => handleMemberChange(index, e)} className="w-full bg-[#1a1a2e] rounded-xl p-2.5 border border-white/10" />
                      </div>
                      <div>
                        <label className="block mb-1 text-xs text-[#a8a29e]">Participant Type *</label>
                        <select required name="participantType" value={member.participantType} onChange={(e) => handleMemberChange(index, e)} className="w-full bg-[#1a1a2e] rounded-xl p-2.5 border border-white/10">
                          <option value="Engineering Student">Engineering Student</option>
                          <option value="Medical Student">Medical Student</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}

                {errorMessage && activeStep === 3 && (
                  <div className="p-3 bg-red-900/50 border border-red-500 rounded-xl text-red-200 text-xs">{errorMessage}</div>
                )}

                <div className="flex justify-between pt-4">
                  <button type="button" onClick={() => { setErrorMessage(''); setActiveStep(2); }} className="px-6 py-2.5 rounded-full border border-white/20 text-[#a8a29e] hover:text-white text-xs uppercase tracking-wider cursor-pointer">
                    ← Back
                  </button>
                  <button type="button" onClick={handleStep3Next} className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider cursor-pointer">
                    Next: Review & Submit →
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {activeStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <h3 className="text-lg font-bold text-[#f59e0b] border-b border-white/10 pb-2 flex items-center gap-2">
                  <span>4.</span>
                  <span>Declarations & Submit</span>
                </h3>

                <div className="bg-[#141420] border border-white/10 rounded-2xl p-5 space-y-3 text-xs text-[#a8a29e]">
                  <p><strong>Team:</strong> {formData.teamName || 'Not entered yet'}</p>
                  <p><strong>Problem:</strong> {formData.selectedProblemStatement}</p>
                  <p><strong>Abstract Link:</strong> {formData.abstractDriveLink || 'Not entered yet'}</p>
                  <p><strong>Total Participants:</strong> {1 + formData.teamMembers.length} members</p>
                </div>

                <div className="space-y-4 bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input required type="checkbox" checked={formData.declarationsAccepted} onChange={(e) => setFormData({ ...formData, declarationsAccepted: e.target.checked })} className="mt-1 w-4 h-4 accent-[#dc2626]" />
                    <span className="text-gray-300 text-xs leading-relaxed">
                      I confirm all information provided is accurate, each participant is registered in one team only, and our team adheres to the mandatory composition (at least 1 female member).
                    </span>
                  </label>
                </div>

                {errorMessage && <div className="p-3 bg-red-900/50 border border-red-500 rounded-xl text-red-200 text-xs">{errorMessage}</div>}

                <div className="pt-4 flex justify-between items-center">
                  <button type="button" onClick={() => setActiveStep(3)} className="px-6 py-2.5 rounded-full border border-white/20 text-[#a8a29e] hover:text-white text-xs uppercase tracking-wider cursor-pointer">
                    ← Back
                  </button>
                  <button type="submit" disabled={status === 'loading'} className="bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white font-bold px-8 py-3 rounded-full hover:from-[#ef4444] hover:to-[#dc2626] disabled:opacity-50 text-xs uppercase tracking-widest shadow-[0_4px_20px_rgba(220,38,38,0.5)] cursor-pointer">
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
