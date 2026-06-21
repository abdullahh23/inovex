const fs = require('fs');
const file = 'src/pages/admin/AdminUsersPage.tsx';
let c = fs.readFileSync(file, 'utf8');

// Find start and end of the broken actions section
const start = c.indexOf('{/* Actions */}');
// Find the closing </tr> after the actions td
const endMarker = '</td>\n                 </tr>';
const endIdx = c.indexOf(endMarker, start);
const end = endIdx + endMarker.length;

const fixed = `{/* Actions */}
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center gap-1.5 justify-end flex-wrap">
                      {u.role !== 'admin' && (
                        u.status === 'suspended' || u.is_disabled ? (
                          <button
                            onClick={() => handleApprove(u.id)}
                            className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-xl transition-all border bg-green-50 text-green-700 border-green-200 hover:bg-green-600 hover:text-white"
                            title="Approve / Unsuspend user"
                          >
                            <CheckCircle size={12} /> Approve
                          </button>
                        ) : (
                          <button
                            onClick={() => handleSuspend(u.id)}
                            className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-xl transition-all border bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-600 hover:text-white"
                            title="Suspend user"
                          >
                            <XCircle size={12} /> Suspend
                          </button>
                        )
                      )}
                      {u.role !== 'admin' && (
                        confirmDeleteId === u.id ? (
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-red-600 font-bold">Sure?</span>
                            <button
                              onClick={() => handleDeleteUser(u.id)}
                              disabled={deleting}
                              className="text-[10px] font-bold px-2 py-1.5 rounded-xl bg-red-600 text-white border border-red-700 hover:bg-red-700 transition-all disabled:opacity-50"
                            >
                              {deleting ? '...' : 'Yes, Delete'}
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(null)}
                              className="text-[10px] font-bold px-2 py-1.5 rounded-xl bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 transition-all"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDeleteId(u.id)}
                            className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-xl transition-all border bg-red-50 text-red-700 border-red-200 hover:bg-red-700 hover:text-white"
                            title="Permanently delete user"
                          >
                            <Trash2 size={11} /> Delete
                          </button>
                        )
                      )}
                    </div>
                  </td>
                </tr>`;

c = c.slice(0, start) + fixed + c.slice(end);
fs.writeFileSync(file, c, 'utf8');
console.log('Done! Actions section fixed.');
