import React, { useState, useMemo, useRef } from "react";
import { PageTitle, SectionTitle, Paragraph } from "./components/Typography";

/* ----------------------- Shared NM Palette & Fonts ----------------------- */
const COLORS = {
  // Brand
  primary: "#1E3A8A",
  primaryLight: "#E0E7FF",
  // Text
  textDark: "#1F2937",
  textGrey: "#6B7280",
  // Status
  success: "#10B981",
  warning: "#F59E0B",
  // Surfaces
  background: "#F9FAFB",
  sidebar: "#FFFFFF",
  borderLight: "#E5E7EB",
};

const GlobalStyles = () => (
  <>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
    />
  </>
);

/* ------------------------------ Mocked Data ------------------------------ */
const initialTaskData = [
  {
    id: 1,
    name: "File annual GST returns (GSTR-9)",
    company: "Innovate Inc.",
    assignedTo: "Aarav Patel",
    priority: "High",
    dueDate: "2024-03-15",
    status: "Pending",
  },
  {
    id: 2,
    name: "TDS Payment for Q3",
    company: "Nexus Solutions",
    assignedTo: "Unassigned",
    priority: "Medium",
    dueDate: "2024-04-30",
    status: "Not Started",
  },
  {
    id: 3,
    name: "ROC Form MGT-7 Filing",
    company: "QuantumLeap Corp",
    assignedTo: "Priya Sharma",
    priority: "Medium",
    dueDate: "2024-05-10",
    status: "In Review",
  },
  {
    id: 4,
    name: "Advance Tax - 4th Installment",
    company: "Stellar Systems",
    assignedTo: "Rohan Mehta",
    priority: "Low",
    dueDate: "2024-06-15",
    status: "Completed",
  },
  {
    id: 5,
    name: "Board Meeting Minutes Preparation",
    company: "Innovate Inc.",
    assignedTo: "Ananya Iyer",
    priority: "High",
    dueDate: "2024-07-01",
    status: "Pending",
  },
  {
    id: 6,
    name: "PF & ESI Monthly Contribution",
    company: "Nexus Solutions",
    assignedTo: "Rohan Mehta",
    priority: "Medium",
    dueDate: "2024-03-15",
    status: "Completed",
  },
  {
    id: 7,
    name: "Customs Duty Declaration",
    company: "Stellar Systems",
    assignedTo: "Priya Sharma",
    priority: "High",
    dueDate: "2024-04-30",
    status: "Pending",
  },
  {
    id: 8,
    name: "New Client Onboarding - KYC",
    company: "QuantumLeap Corp",
    assignedTo: "Unassigned",
    priority: "Low",
    dueDate: "2024-05-10",
    status: "Not Started",
  },
];

const uniqueValues = (data, key) => [
  "All",
  ...new Set(data.map((d) => d[key])),
];
const companyOptions = uniqueValues(initialTaskData, "company");
const assigneeOptions = uniqueValues(initialTaskData, "assignedTo");
const priorityOptions = uniqueValues(initialTaskData, "priority");
const statusOptions = uniqueValues(initialTaskData, "status");

/* ---------------------------- Reusable Pieces ---------------------------- */
const MetricCard = ({ icon, iconColor, bgColor, title, value, valueColor }) => (
  <div
    className="p-4 flex items-center gap-3 rounded-xl"
    style={{
      backgroundColor: COLORS.sidebar,
      border: `1px solid ${COLORS.borderLight}`,
      boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1)",
    }}
  >
    <div
      className={`flex items-center justify-center size-10 rounded-full ${bgColor}`}
    >
      <span className={`material-symbols-outlined ${iconColor} text-xl`}>
        {icon}
      </span>
    </div>
    <div>
      <p className="text-xs" style={{ color: COLORS.textGrey }}>
        {title}
      </p>
      <p className={`text-xl font-bold ${valueColor}`}>{value}</p>
    </div>
  </div>
);

const PriorityPill = ({ priority }) => {
  const map = {
    High: { bg: "#FEE2E2", text: "#B91C1C" },
    Medium: { bg: "#FEF3C7", text: "#92400E" },
    Low: { bg: "#D1FAE5", text: "#065F46" },
  };
  const { bg, text } = map[priority] || map.Medium;
  return (
    <span
      className="px-3 py-1 rounded-md text-xs font-semibold"
      style={{ backgroundColor: bg, color: text }}
    >
      {priority}
    </span>
  );
};

const StatusText = ({ status }) => {
  const style = {
    color:
      status === "Completed"
        ? COLORS.success
        : status === "In Review"
        ? COLORS.primary
        : COLORS.warning,
    fontWeight: 700,
  };
  return <span style={style}>{status}</span>;
};

/* ----------------------------- Task Modal UI ----------------------------- */
const TaskDetailModal = ({ isOpen, onClose, task, onSave, allAssignees }) => {
  const isNew = !task?.id;
  const [form, setForm] = useState({
    name: task?.name || "",
    company: task?.company || companyOptions.find((c) => c !== "All") || "",
    assignedTo: task?.assignedTo || allAssignees.find((a) => a !== "All") || "",
    priority: task?.priority || "Medium",
    dueDate: task?.dueDate || new Date().toISOString().slice(0, 10),
    status: task?.status || "Not Started",
    description:
      task?.description ||
      "Add a brief description for this task. (UX-only field)",
    notes: "",
  });

  React.useEffect(() => {
    setForm({
      name: task?.name || "",
      company: task?.company || companyOptions.find((c) => c !== "All") || "",
      assignedTo:
        task?.assignedTo || allAssignees.find((a) => a !== "All") || "",
      priority: task?.priority || "Medium",
      dueDate: task?.dueDate || new Date().toISOString().slice(0, 10),
      status: task?.status || "Not Started",
      description: "Add a brief description for this task. (UX-only field)",
      notes: "",
    });
  }, [task, allAssignees]);

  if (!isOpen) return null;

  const input = "w-full h-12 px-4 rounded-lg border text-sm";
  const border = { border: `1px solid ${COLORS.borderLight}` };

  const handle = (e) =>
    setForm((f) => ({ ...f, [e.target.id]: e.target.value }));
  const save = () => onSave(form);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        className="rounded-xl shadow-2xl p-6 w-full max-w-xl relative"
        style={{ backgroundColor: COLORS.sidebar }}
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
          aria-label="Close"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <h3
          className="text-xl font-bold mb-4"
          style={{ color: COLORS.textDark }}
        >
          {isNew ? "Create Task" : "Task Details"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className="text-sm font-semibold mb-1 block"
              style={{ color: COLORS.textDark }}
            >
              Task Title
            </label>
            <input
              id="name"
              className={input}
              style={border}
              placeholder="Enter task title"
              value={form.name}
              onChange={handle}
            />
          </div>
          <div>
            <label
              className="text-sm font-semibold mb-1 block"
              style={{ color: COLORS.textDark }}
            >
              Company
            </label>
            <select
              id="company"
              className={input}
              style={border}
              value={form.company}
              onChange={handle}
            >
              {companyOptions
                .filter((c) => c !== "All")
                .map((c) => (
                  <option key={c}>{c}</option>
                ))}
            </select>
          </div>
          <div>
            <label
              className="text-sm font-semibold mb-1 block"
              style={{ color: COLORS.textDark }}
            >
              Assigned To
            </label>
            <select
              id="assignedTo"
              className={input}
              style={border}
              value={form.assignedTo}
              onChange={handle}
            >
              {allAssignees
                .filter((a) => a !== "All")
                .map((a) => (
                  <option key={a}>{a}</option>
                ))}
            </select>
          </div>
          <div>
            <label
              className="text-sm font-semibold mb-1 block"
              style={{ color: COLORS.textDark }}
            >
              Priority
            </label>
            <select
              id="priority"
              className={input}
              style={border}
              value={form.priority}
              onChange={handle}
            >
              {priorityOptions
                .filter((p) => p !== "All")
                .map((p) => (
                  <option key={p}>{p}</option>
                ))}
            </select>
          </div>
          <div>
            <label
              className="text-sm font-semibold mb-1 block"
              style={{ color: COLORS.textDark }}
            >
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              className={input}
              style={border}
              value={form.dueDate}
              onChange={handle}
            />
          </div>
          <div>
            <label
              className="text-sm font-semibold mb-1 block"
              style={{ color: COLORS.textDark }}
            >
              Status
            </label>
            <select
              id="status"
              className={input}
              style={border}
              value={form.status}
              onChange={handle}
            >
              {statusOptions
                .filter((s) => s !== "All")
                .map((s) => (
                  <option key={s}>{s}</option>
                ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label
              className="text-sm font-semibold mb-1 block"
              style={{ color: COLORS.textDark }}
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full min-h-24 p-4 rounded-lg border text-sm"
              style={border}
              value={form.description}
              onChange={handle}
            />
          </div>
          <div className="md:col-span-2">
            <label
              className="text-sm font-semibold mb-1 block"
              style={{ color: COLORS.textDark }}
            >
              Notes
            </label>
            <textarea
              id="notes"
              className="w-full min-h-20 p-4 rounded-lg border text-sm"
              style={border}
              placeholder="Add a note…"
              value={form.notes}
              onChange={handle}
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={save}
            className="flex-1 py-2.5 px-4 text-sm font-semibold rounded-lg shadow-md transition-colors"
            style={{ backgroundColor: COLORS.primary, color: COLORS.sidebar }}
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 text-sm font-semibold rounded-lg border transition-colors hover:bg-gray-50"
            style={{
              backgroundColor: COLORS.sidebar,
              color: COLORS.textDark,
              borderColor: COLORS.borderLight,
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

/* --------------------------- Main TM (NM-Styled) -------------------------- */
const TaskManagementInline = () => {
  const [tasks, setTasks] = useState(initialTaskData);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [companyFilter, setCompanyFilter] = useState("All");
  const [assignedToFilter, setAssignedToFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Filtering
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        t.name.toLowerCase().includes(q) ||
        t.company.toLowerCase().includes(q) ||
        t.assignedTo.toLowerCase().includes(q);

      const matchesCompany =
        companyFilter === "All" || t.company === companyFilter;
      const matchesAssignee =
        assignedToFilter === "All" || t.assignedTo === assignedToFilter;
      const matchesPriority =
        priorityFilter === "All" || t.priority === priorityFilter;
      const matchesStatus = statusFilter === "All" || t.status === statusFilter;

      return (
        matchesSearch &&
        matchesCompany &&
        matchesAssignee &&
        matchesPriority &&
        matchesStatus
      );
    });
  }, [
    tasks,
    searchTerm,
    companyFilter,
    assignedToFilter,
    priorityFilter,
    statusFilter,
  ]);

  // Pagination math
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const totalTasks = filteredTasks.length;

  // Stats
  const metrics = [
    {
      icon: "list_alt",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
      title: "Total Tasks",
      value: tasks.length,
      valueColor: "text-blue-600",
    },
    {
      icon: "hourglass_top",
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-100",
      title: "Pending",
      value: tasks.filter((t) => ["Pending", "Not Started"].includes(t.status))
        .length,
      valueColor: "text-yellow-600",
    },
    {
      icon: "rate_review",
      iconColor: "text-indigo-600",
      bgColor: "bg-indigo-100",
      title: "In Review",
      value: tasks.filter((t) => t.status === "In Review").length,
      valueColor: "text-indigo-600",
    },
    {
      icon: "task_alt",
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
      title: "Completed",
      value: tasks.filter((t) => t.status === "Completed").length,
      valueColor: "text-green-600",
    },
  ];

  // Handlers
  const openCreate = () => {
    setSelectedTask({});
    setIsModalOpen(true);
  };

  const openView = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const saveTask = (form) => {
    if (!form.name?.trim()) {
      alert("Task title is required.");
      return;
    }
    if (selectedTask?.id) {
      // Update
      setTasks((prev) =>
        prev.map((t) => (t.id === selectedTask.id ? { ...t, ...form } : t))
      );
    } else {
      // Create
      const newId = Math.max(0, ...tasks.map((t) => t.id)) + 1;
      setTasks((prev) => [{ id: newId, ...form }, ...prev]);
    }
    setIsModalOpen(false);
  };

  const pageBtnClass =
    "px-3 py-2 text-sm border -ml-px first:ml-0 first:rounded-l-md last:rounded-r-md";

  return (
    <>
      <GlobalStyles />
      <div
        className="font-sans relative flex min-h-screen w-full"
        style={{ backgroundColor: COLORS.background }}
      >
        <main className="flex-1 px-12 py-8 grid grid-cols-12 gap-8">
          {/* Left column */}
          <div className="col-span-12 lg:col-span-9 flex flex-col gap-6">
            {/* Title */}
            <div className="flex flex-col gap-1">
              <PageTitle>Task Management</PageTitle>
              <Paragraph>
                Review, assign, and track compliance tasks across all clients.
              </Paragraph>
            </div>

            {/* Header actions (aligned with NM) */}
            <header className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={openCreate}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium rounded-lg border transition-colors hover:bg-gray-50"
                  style={{
                    backgroundColor: COLORS.sidebar,
                    color: COLORS.textDark,
                    borderColor: COLORS.borderLight,
                  }}
                >
                  <span>➕</span>
                  <span>Add Task</span>
                </button>
                <button
                  className="flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium rounded-lg border transition-colors hover:bg-gray-50"
                  style={{
                    backgroundColor: COLORS.sidebar,
                    color: COLORS.textDark,
                    borderColor: COLORS.borderLight,
                  }}
                >
                  <span>⚙️</span>
                  <span>Bulk Actions</span>
                </button>
              </div>
            </header>

            {/* Metrics */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((m) => (
                <MetricCard key={m.title} {...m} />
              ))}
            </section>

            {/* Filters */}
            <section
              className="p-6 rounded-xl"
              style={{
                backgroundColor: COLORS.sidebar,
                border: `1px solid ${COLORS.borderLight}`,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[300px]">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <span
                      className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-xl"
                      style={{ color: COLORS.textGrey }}
                    >
                      search
                    </span>
                    <input
                      className="w-full h-12 pl-10 pr-4 rounded-lg border text-sm"
                      style={{ border: `1px solid ${COLORS.borderLight}` }}
                      placeholder="Search tasks, company, team member…"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  {/* Selects */}
                  <select
                    className="h-12 px-4 rounded-lg border text-sm"
                    style={{ border: `1px solid ${COLORS.borderLight}` }}
                    value={companyFilter}
                    onChange={(e) => setCompanyFilter(e.target.value)}
                  >
                    {companyOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                  <select
                    className="h-12 px-4 rounded-lg border text-sm"
                    style={{ border: `1px solid ${COLORS.borderLight}` }}
                    value={assignedToFilter}
                    onChange={(e) => setAssignedToFilter(e.target.value)}
                  >
                    {assigneeOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                  <select
                    className="h-12 px-4 rounded-lg border text-sm"
                    style={{ border: `1px solid ${COLORS.borderLight}` }}
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                  >
                    {priorityOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                  <select
                    className="h-12 px-4 rounded-lg border text-sm"
                    style={{ border: `1px solid ${COLORS.borderLight}` }}
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    {statusOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={openCreate}
                  className="flex items-center justify-center gap-2 py-2.5 px-6 text-sm font-semibold rounded-lg shadow-sm transition-colors"
                  style={{
                    backgroundColor: COLORS.primary,
                    color: COLORS.sidebar,
                  }}
                >
                  Create Task
                </button>
              </div>
            </section>

            {/* Tasks Table */}
            <section
              className="p-6 rounded-xl flex flex-col gap-4"
              style={{
                backgroundColor: COLORS.sidebar,
                border: `1px solid ${COLORS.borderLight}`,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            >
              <SectionTitle>Tasks ({totalTasks} Total)</SectionTitle>

              {/* Header */}
              <div
                className="grid grid-cols-7 gap-4 text-xs uppercase font-semibold pb-3 border-b"
                style={{
                  color: COLORS.textGrey,
                  borderColor: COLORS.borderLight,
                }}
              >
                <span>Task Name</span>
                <span>Company</span>
                <span>Assigned</span>
                <span>Priority</span>
                <span>Due Date</span>
                <span>Status</span>
                <span>Action</span>
              </div>

              {/* Rows */}
              {currentTasks.length ? (
                currentTasks.map((t) => (
                  <div
                    key={t.id}
                    className="grid grid-cols-7 gap-4 items-center text-sm font-semibold py-2"
                  >
                    <span style={{ color: COLORS.textDark }}>{t.name}</span>
                    <span style={{ color: COLORS.textDark }}>{t.company}</span>
                    <span
                      style={{
                        color:
                          t.assignedTo === "Unassigned"
                            ? "#DC2626"
                            : COLORS.textDark,
                      }}
                    >
                      {t.assignedTo}
                    </span>
                    <span>
                      <PriorityPill priority={t.priority} />
                    </span>
                    <span style={{ color: COLORS.textDark, fontWeight: 700 }}>
                      {t.dueDate}
                    </span>
                    <StatusText status={t.status} />
                    <a
                      className="hover:underline cursor-pointer"
                      style={{ color: COLORS.primary }}
                      onClick={() => openView(t)}
                    >
                      {t.assignedTo === "Unassigned" ? "Assign" : "View"}
                    </a>
                  </div>
                ))
              ) : (
                <div
                  className="py-10 text-center text-lg"
                  style={{ color: COLORS.textGrey }}
                >
                  No tasks match your current filters. 😔
                </div>
              )}

              {/* Pagination */}
              <nav
                className="flex items-center justify-between pt-4 border-t"
                style={{ borderColor: COLORS.borderLight }}
              >
                <span className="text-sm" style={{ color: COLORS.textGrey }}>
                  Showing{" "}
                  <span
                    className="font-semibold"
                    style={{ color: COLORS.textDark }}
                  >
                    {totalTasks ? indexOfFirstTask + 1 : 0}–
                    {Math.min(indexOfLastTask, totalTasks)}
                  </span>{" "}
                  of{" "}
                  <span
                    className="font-semibold"
                    style={{ color: COLORS.textDark }}
                  >
                    {totalTasks}
                  </span>
                </span>
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button
                    className={`${pageBtnClass}`}
                    style={{
                      borderColor: COLORS.borderLight,
                      color:
                        currentPage === 1 ? COLORS.textGrey : COLORS.primary,
                      backgroundColor: COLORS.sidebar,
                      cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    }}
                    onClick={() =>
                      currentPage > 1 && setCurrentPage((p) => p - 1)
                    }
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (n) => (
                      <button
                        key={n}
                        className={pageBtnClass}
                        style={{
                          borderColor: COLORS.borderLight,
                          color: n === currentPage ? COLORS.primary : "#4B5563",
                          backgroundColor:
                            n === currentPage
                              ? COLORS.primaryLight
                              : COLORS.sidebar,
                        }}
                        onClick={() => setCurrentPage(n)}
                      >
                        {n}
                      </button>
                    )
                  )}
                  <button
                    className={pageBtnClass}
                    style={{
                      borderColor: COLORS.borderLight,
                      color:
                        currentPage === totalPages || totalPages === 0
                          ? COLORS.textGrey
                          : COLORS.primary,
                      backgroundColor: COLORS.sidebar,
                      cursor:
                        currentPage === totalPages || totalPages === 0
                          ? "not-allowed"
                          : "pointer",
                    }}
                    onClick={() =>
                      currentPage < totalPages && setCurrentPage((p) => p + 1)
                    }
                  >
                    Next
                  </button>
                </div>
              </nav>
            </section>
          </div>

          {/* Right column (optional helpers / future widgets) */}
          <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6">
            <div
              className="p-5 rounded-xl"
              style={{
                backgroundColor: COLORS.sidebar,
                border: `1px solid ${COLORS.borderLight}`,
                boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1)",
              }}
            >
              <p
                className="text-base font-semibold"
                style={{ color: COLORS.textDark }}
              >
                Guidance
              </p>
              <p className="text-xs mt-0.5" style={{ color: COLORS.textGrey }}>
                Keep UI parity across modules: same palette, shadows, border
                radius, and typography.
              </p>
            </div>
          </aside>
        </main>

        {/* Modal */}
        <TaskDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          task={selectedTask}
          onSave={saveTask}
          allAssignees={assigneeOptions}
        />
      </div>
    </>
  );
};

export default TaskManagementInline;
