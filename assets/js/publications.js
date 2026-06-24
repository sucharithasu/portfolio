/* =========================================================
   Publications dataset + real-time search and filter.
   Data sourced from Dr. G. Sucharitha's academic CV.
   ========================================================= */
(function () {
  'use strict';

  const PUBS = [
    // ---------- Journals ----------
    { t: 'A Deep Dictionary Clustering Approach for Unsupervised Image Retrieval Using Convolutional Sparse Coding',
      a: 'Sucharitha, G., et al.', v: 'Scientific Reports, Springer Nature', y: 2025, type: 'journal',
      meta: ['Impact Factor 3.9', 'SCIE+Q1'], doi: '' },
    { t: 'Semantic data sharing and pricing in web 3.0 using blockchain',
      a: 'Sucharitha, G., et al.', v: 'Discover Computing, Springer', y: 2025, type: 'journal',
      meta: ['Impact Factor 3.2', 'SCIE+Q2'], doi: 'https://doi.org/10.1007/s10791-025-09822-9' },
    { t: 'Mutual Contextual Relation-Guided Dynamic Graph Networks for Cross-Modal Image-Text Retrieval',
      a: 'Sucharitha, G., et al.', v: 'Scientific Reports, Springer', y: 2025, type: 'journal',
      meta: ['Impact Factor 3.9', 'SCIE+Q1'], doi: 'https://doi.org/10.1038/s41598-025-11045-3' },
    { t: 'A private Ethereum blockchain for organ donation and transplantation based on intelligent smart contracts',
      a: 'Sucharitha, G., et al.', v: 'Egyptian Informatics Journal', y: 2024, type: 'journal',
      meta: ['Impact Factor 5.0', 'SCIE+Q1'], doi: 'https://doi.org/10.1016/j.eij.2024.100542' },
    { t: 'Gaussian filter and CNN based framework for accurate detection of brain tumor by analyzing MRI images',
      a: 'Sucharitha, G., et al.', v: 'Bulletin of Electrical Engineering and Informatics', y: 2024, type: 'journal',
      meta: ['Scopus'], doi: 'https://doi.org/10.11591/eei.v13i6.6778' },
    { t: 'Secure and efficient content-based image retrieval using dominant local patterns and watermark encryption in cloud computing',
      a: 'Sucharitha, G., et al.', v: 'Cluster Computing', y: 2024, type: 'journal',
      meta: ['Impact Factor 3.6', 'Scopus & SCI+Q1'], doi: 'https://doi.org/10.1007/s10586-024-04635-9' },
    { t: 'GIEnsemformerCADx: A hybrid ensemble learning approach for enhanced gastrointestinal cancer recognition',
      a: 'Sucharitha, G., et al.', v: 'Multimedia Tools and Applications', y: 2024, type: 'journal',
      meta: ['Impact Factor 2.8', 'Scopus & SCI+Q1'], doi: 'https://doi.org/10.1007/s11042-024-18521-4' },
    { t: 'Deep learning aided prostate cancer detection for early diagnosis using MR with TRUS images & treatment',
      a: 'Sucharitha, G., et al.', v: 'Journal of Intelligent & Fuzzy Systems', y: 2024, type: 'journal',
      meta: ['Impact Factor 0.733', 'Scopus & SCI+Q2'], doi: 'https://doi.org/10.3233/JIFS-235744' },
    { t: 'Enhancing Secure Communication in the Cloud through Blockchain Assisted CP-DABE',
      a: 'Sucharitha, G., et al.', v: 'IEEE Access', y: 2023, type: 'journal',
      meta: ['Impact Factor 3.476', 'Scopus & SCI+Q1'], doi: 'https://doi.org/10.1109/ACCESS.2023.3312609' },
    { t: 'Electronic Medical Records using Blockchain Technology',
      a: 'Sucharitha, G., et al.', v: 'EAI Endorsed Transactions on Pervasive Health and Technology', y: 2023, type: 'journal',
      meta: ['Impact Factor 2.85', 'Scopus'], doi: 'https://doi.org/10.4108/eetpht.9.4284' },
    { t: 'A Study on the Performance of Deep Learning Models for Leaf Disease Detection',
      a: 'Sucharitha, G., et al.', v: 'EAI Endorsed Transactions on Internet of Things', y: 2023, type: 'journal',
      meta: ['Impact Factor 2.85', 'Scopus'], doi: 'https://doi.org/10.4108/eetiot.4592' },
    { t: 'Soft Computing Techniques for Detecting Cyberbullying in Social Multimedia Data',
      a: 'Sucharitha, G., et al.', v: 'ACM Journal of Data and Information Quality', y: 2023, type: 'journal',
      meta: ['Impact Factor 0.733', 'Scopus & SCI'], doi: 'https://dl.acm.org/doi/pdf/10.1145/3604617' },
    { t: 'MVM-LBP: mean variance median based LBP for face recognition',
      a: 'Nitin Arora, Sucharitha, G.', v: 'International Journal of Information Technology', y: 2023, type: 'journal',
      meta: ['Impact Factor 1.4', 'Scopus'], doi: 'https://doi.org/10.1007/s41870-023-01204-y' },
    { t: 'Medical Image Retrieval using a Novel Local Relative Directional Edge Pattern and Zernike Moments',
      a: 'Sucharitha, G., Nitin Arora', v: 'Multimedia Tools and Applications', y: 2023, type: 'journal',
      meta: ['Impact Factor 2.8', 'Scopus & SCI+Q1'], doi: 'https://doi.org/10.1007/s11042-023-14720-7' },
    { t: 'Biomedical image retrieval using local directional edge binary patterns and Zernike moments',
      a: 'Sucharitha, G., Ranjan Kumar Senapati', v: 'Multimedia Tools and Applications 79(3): 1847-1864', y: 2020, type: 'journal',
      meta: ['Impact Factor 2.757', 'Scopus & SCI+Q1'], doi: 'https://doi.org/10.1007/s11042-019-08215-7' },
    { t: 'Local Quantized Edge Binary Patterns for Colour Texture Image Retrieval',
      a: 'Sucharitha, G., Ranjan K. Senapati', v: 'Journal of Theoretical & Applied Information Technology 96(2)', y: 2018, type: 'journal',
      meta: ['Impact Factor 0.6', 'Scopus'], doi: '' },
    { t: 'Shape based image retrieval using lower order Zernike moments',
      a: 'Sucharitha, G., Ranjan K. Senapati', v: 'International Journal of Electrical and Computer Engineering 7(3): 1651', y: 2017, type: 'journal',
      meta: ['Impact Factor 2.7', 'Scopus'], doi: 'http://doi.org/10.11591/ijece.v7i3.pp1651-1660' },
    { t: 'Optimized Image Retrieval Using HSV Color Space, Local Edge Binary Patterns and Zernike Moments',
      a: 'Sucharitha, G., Ranjan Senapati', v: 'Journal of Engineering and Applied Sciences 13: 6777-6786', y: 2018, type: 'journal',
      meta: ['Impact Factor 1.21', 'Scopus'], doi: 'http://dx.doi.org/10.36478/jeasci.2018.6777.6786' },
    { t: 'Local extreme edge binary patterns for face recognition and image retrieval',
      a: 'Sucharitha, G., Ranjan K. Senapati', v: 'Journal of Advanced Research in Dynamical and Control Systems 10: 644-654', y: 2018, type: 'journal',
      meta: ['Impact Factor 1.1', 'Scopus'], doi: '' },

    // ---------- Conferences ----------
    { t: 'Selective Gradient Diffusion for Localized Text-Guided Image Augmentation',
      a: 'Sucharitha, G.', v: '40th International Conference on Information Networking (ICOIN-2026), PTIT, Hanoi, Vietnam', y: 2026, type: 'conference',
      meta: ['Tier-2'], doi: 'https://doi.org/10.1109/ICOIN68469.2026.11480648' },
    { t: 'A Hybrid Vision Transformer with Intra-Attention Architecture for Enhanced Medical Image Retrieval',
      a: 'Sucharitha, G.', v: 'IEEE AVSS-2025, NYCU, Tainan, Taiwan', y: 2025, type: 'conference',
      meta: ['Tier-2'], doi: 'https://doi.org/10.1109/AVSS65446.2025.11149925' },
    { t: 'IoT with Edge Computing-Based Agro-Economic Model for Sustainable Farming',
      a: 'Sucharitha, G.', v: 'IEEE AVSS-2025, NYCU, Tainan, Taiwan', y: 2025, type: 'conference',
      meta: ['Tier-2'], doi: 'https://doi.org/10.1109/AVSS65446.2025.11149891' },
    { t: 'Prediction of Suicidal Behaviour among the users on Social Media',
      a: 'Sucharitha, G.', v: 'IEEE ICCCNT-2025, IIT-Indore, India', y: 2025, type: 'conference',
      meta: ['IEEE'], doi: '' },
    { t: 'Prediction of Suicidal Behaviour among the users on Social Media using NLP and ML',
      a: 'Sucharitha, G.', v: 'IEEE ESIC-2024', y: 2024, type: 'conference',
      meta: ['IEEE'], doi: 'http://dx.doi.org/10.1109/ESIC60604.2024.10481588' },
    { t: 'Efficient Image Retrieval Technique with Local Edge Binary Pattern Using Combined Color and Texture Features',
      a: 'Sucharitha, G., BJD Kalyani et al.', v: 'CIEMA 2022, Springer', y: 2022, type: 'conference',
      meta: ['Springer'], doi: 'https://doi.org/10.1007/978-981-19-8493-8_21' },
    { t: 'Local Extreme Co-occurrence Edge Binary Pattern for Bio-medical Image Retrieval',
      a: 'Sucharitha, G., Ranjan K. Senapati', v: 'IEEE ICACCP 2019', y: 2019, type: 'conference',
      meta: ['IEEE'], doi: 'https://doi.org/10.1109/ICACCP.2019.8882988' },
    { t: 'Optimisation of the Execution Time Using Hadoop-Based Parallel Machine Learning on Computing Clusters',
      a: 'B. V. V. Siva Prasad, G. Sucharitha', v: 'ICCBI-2021, Springer', y: 2021, type: 'conference',
      meta: ['Springer'], doi: 'https://doi.org/10.1007/978-981-19-0898-9_18' },

    // ---------- Book chapters ----------
    { t: 'Edge Intelligence — The Cutting Edge of the Healthcare Industry',
      a: 'Sucharitha G., et al.', v: 'Reconnoitering the Landscape of Edge Intelligence in Healthcare, CRC Press', y: 2024, type: 'book',
      meta: ['Book Chapter'], doi: 'https://doi.org/10.1201/9781003401841' },
    { t: 'A Novel Trust Evaluation and Reputation Data Management Based Security System Model for Mobile Edge Computing Network',
      a: 'Sucharitha G., et al.', v: 'Security and Risk Analysis for Intelligent Edge Computing, Springer', y: 2023, type: 'book',
      meta: ['Book Chapter'], doi: 'https://doi.org/10.1007/978-3-031-28150-1_8' },
    { t: 'Custom manufacturing using Industry 4.0: cost-effective industry revolution model',
      a: 'Sucharitha G., Ujjwal Shivacharya, Sri Vishal Lanka, Sirisha Potluri', v: 'Cloud Analytics for Industry 4.0, De Gruyter', y: 2022, type: 'book',
      meta: ['Book Chapter'], doi: 'https://doi.org/10.1515/9783110771572' },
    { t: 'The impact of green manufacturing in Industry 4.0 for future ecosystems',
      a: 'Sucharitha G., IVS Suhruth, B Vishweshwar, S Potluri', v: 'Cloud Analytics for Industry 4.0, De Gruyter', y: 2022, type: 'book',
      meta: ['Book Chapter'], doi: 'https://doi.org/10.1515/9783110771572' },
    { t: 'Developments in Agriculture Technology Using Internet of Things',
      a: 'Sucharitha, G., M. Mandeep Sai', v: 'Internet of Things and Its Applications, Springer Cham, 341-360', y: 2022, type: 'book',
      meta: ['Book Chapter'], doi: 'https://doi.org/10.1007/978-3-030-77528-5_18' },
    { t: 'Revolution in IoT: Smart Wearable Technology',
      a: 'Sucharitha, G., Bodepu Tannmayee, Kanagala Dwarakamai', v: 'Internet of Things and Its Applications, Springer Cham, 407-425', y: 2022, type: 'book',
      meta: ['Book Chapter'], doi: 'https://doi.org/10.1007/978-3-030-77528-5_21' },
    { t: 'Theory and Implications of Information Processing',
      a: 'Sucharitha, G., et al.', v: 'Emotion and Information Processing, Springer Cham, 39-54', y: 2020, type: 'book',
      meta: ['Book Chapter'], doi: 'https://doi.org/10.1007/978-3-030-48849-9_4' },
    { t: 'Honeypot: A Trap for Attackers',
      a: 'Sucharitha, G., et al.', v: 'The New Advanced Society: AI and Industrial IoT Paradigm, Scrivener Wiley', y: 2022, type: 'book',
      meta: ['Book Chapter'], doi: 'https://doi.org/10.1002/9781119884392.ch5' },
    { t: 'Machine Learning Algorithms & Applications (Edited Book)',
      a: 'M. Srinu, G. Sucharitha, Anjanna Matta', v: 'Scrivener Wiley Publisher (ISBN: 9781119768852)', y: 2021, type: 'book',
      meta: ['Edited Book', 'Scopus'], doi: '' },
    { t: 'Artificial Intelligence Technologies for Engineering Applications (Edited Book)',
      a: 'G. Sucharitha, et al.', v: 'CRC Press Publishing (EISSN: 9781003565529)', y: 2023, type: 'book',
      meta: ['Edited Book', 'Scopus'], doi: '' },

    // ---------- Patents ----------
    { t: 'Education Facilitating System and Method for Visually Impaired Persons',
      a: 'Dr. G. Sucharitha', v: 'Utility Patent No: 580842 — Granted', y: 2026, type: 'patent',
      meta: ['Patent Granted'], doi: '' },
    { t: 'IoT Based Wearable Medical Monitoring System',
      a: 'Dr. G. Sucharitha', v: 'Design No: 6286943 — Granted', y: 2023, type: 'patent',
      meta: ['Patent Granted'], doi: '' },
    { t: 'IoT based Smart and Controllable Wheel Chair Fall Detection for Physically Challenged People',
      a: 'Dr. G. Sucharitha', v: 'File No: 202321028564 A — Published', y: 2023, type: 'patent',
      meta: ['Patent Published'], doi: '' },
    { t: 'System for Enhancing Safety of the Transaction at Automated Banking Machine',
      a: 'Dr. G. Sucharitha', v: 'File No: 202311027716 A — Published', y: 2023, type: 'patent',
      meta: ['Patent Published'], doi: '' },
    { t: 'Real-Time Monitoring System for Compressed Gas Artificial Lift & Method Thereof',
      a: 'Dr. G. Sucharitha', v: 'File No: 202041005255 — Published', y: 2020, type: 'patent',
      meta: ['Patent Published'], doi: '' },
    { t: 'System for Control & Manage Artificial Intelligent Speaker Functionality and Operation using Electronic Pen',
      a: 'Dr. G. Sucharitha', v: 'File No: 202131016697 — Published', y: 2021, type: 'patent',
      meta: ['Patent Published'], doi: '' },
    { t: 'AI techniques and big data analytics based digital document fraud detection system using IoT-enabled ML in finance',
      a: 'Dr. G. Sucharitha', v: 'Application No: 202231060096 A — Published', y: 2022, type: 'patent',
      meta: ['Patent Published'], doi: '' },
  ];

  const list = document.querySelector('#pub-list');
  const count = document.querySelector('#pub-count');
  const search = document.querySelector('#pub-search');
  const filters = document.querySelectorAll('.pub-filter');

  if (!list) return;

  let activeType = 'all';
  let query = '';

  function render() {
    const q = query.trim().toLowerCase();
    const filtered = PUBS
      .filter(p => activeType === 'all' || p.type === activeType)
      .filter(p => !q || (p.t + ' ' + p.a + ' ' + p.v + ' ' + p.meta.join(' ')).toLowerCase().includes(q))
      .sort((a, b) => b.y - a.y);

    list.innerHTML = '';
    if (filtered.length === 0) {
      list.innerHTML = '<div class="pub-empty">No publications match your search.</div>';
    } else {
      const frag = document.createDocumentFragment();
      filtered.forEach(p => {
        const el = document.createElement('article');
        el.className = 'pub-card';
        const typeLabel = { journal: 'Journal', conference: 'Conference', book: 'Book / Chapter', patent: 'Patent' }[p.type];
        el.innerHTML = `
          <div class="pub-card-meta">
            <span class="pub-type ${p.type}">${typeLabel}</span>
            <span class="pub-year">${p.y}</span>
            ${p.meta.map(m => `<span class="pub-year">· ${m}</span>`).join('')}
          </div>
          <h4>${escapeHtml(p.t)}</h4>
          <div class="pub-venue">${escapeHtml(p.a)} — <em>${escapeHtml(p.v)}</em></div>
          ${p.doi ? `<div class="pub-extra"><a href="${p.doi}" target="_blank" rel="noopener">View publication ↗</a></div>` : ''}
        `;
        frag.appendChild(el);
      });
      list.appendChild(frag);
    }
    if (count) count.textContent = `Showing ${filtered.length} of ${PUBS.length} publications`;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeType = btn.dataset.type;
      render();
    });
  });

  if (search) {
    search.addEventListener('input', (e) => {
      query = e.target.value;
      render();
    });
  }

  render();
})();
