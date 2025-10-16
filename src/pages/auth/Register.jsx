import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import useRegister from "@/hooks/useRegister";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/SelectField";
import { SelectItem } from "@/components/ui/select";
import OtpModal from "@/components/auth/OtpModal";
import AvatarUploader from "@/components/form/AvatarUploader";
import { CITIES, getBranchesForCity } from "@/components/constants/locations";
import { DEPARTMENTS } from "@/components/constants/departments";

export default function Register() {
  const [otpOpen, setOtpOpen] = React.useState(false);
  const [otpEmail, setOtpEmail] = React.useState("");

  const { form, update, submit, loading, setForm } = useRegister({
    onSuccess: () => {
      setOtpEmail(form.email);
      setOtpOpen(true);
      toast.success("Registered! Check your email for the code.");
    },
    onError: (message) => toast.error(message || "Something went wrong"),
  });

  // branches for selected city
  const branches = React.useMemo(() => getBranchesForCity(form.city), [form.city]);

  // city change should reset invalid branch
  function handleCityChange(val) {
    setForm((s) => {
      const next = { ...s, city: val };
      const allowed = getBranchesForCity(val);
      if (!allowed.includes(s.branch)) next.branch = "";
      return next;
    });
  }

  return (
    <>
      <OtpModal open={otpOpen} onOpenChange={setOtpOpen} email={otpEmail} />

      <div className="min-h-screen w-full bg-gradient-to-b from-white to-secondary">
        <div className="container flex min-h-screen items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Create your account</CardTitle>
              <CardDescription>
                Employees only — use your work email. Approval required by
                superadmin.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form
                className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4"
                onSubmit={submit}
              >
                <InputField
                  label="Full Name"
                  name="fullName"
                  placeholder="Awais Ali"
                  value={form.fullName}
                  onChange={update}
                  required
                  containerClassName="md:col-span-2 space-y-1"
                />

                <InputField
                  label="Employee ID"
                  name="employeeId"
                  type="Number"
                  placeholder="EMP-1024"
                  value={form.employeeId}
                  onChange={update}
                  required
                  containerClassName="space-y-1"
                />
                <InputField
                  label="CNIC"
                  type="Number"
                  name="cnic"
                  placeholder="35202-xxxxxxx-x"
                  value={form.cnic}
                  onChange={update}
                  required
                  containerClassName="space-y-1"
                />

                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={update}
                  required
                  containerClassName="md:col-span-2 space-y-1"
                  autoComplete="email"
                />

                {/* Department — separated sections */}
                <SelectField
                  label="Department"
                  name="department"
                  value={form.department}
                  onValueChange={(val) =>
                    setForm((s) => ({ ...s, department: val }))
                  }
                  placeholder="Select department"
                  containerClassName="space-y-1"
                >
                  {/* Group label (disabled item for visual separation) */}
                 
                  {DEPARTMENTS.map((d) => (
                    <SelectItem key={`std-${d}`} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectField>

                {/* City */}
                <SelectField
                  label="City"
                  name="city"
                  value={form.city}
                  onValueChange={handleCityChange}
                  placeholder="Select city"
                  containerClassName="space-y-1"
                >
                  {CITIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectField>

                {/* Branch (depends on City) */}
                <SelectField
                  label="Branch"
                  name="branch"
                  value={form.branch}
                  onValueChange={(val) =>
                    setForm((s) => ({ ...s, branch: val }))
                  }
                  placeholder={
                    form.city
                      ? branches.length
                        ? "Select branch"
                        : "No branches available"
                      : "Select city first"
                  }
                  containerClassName="space-y-1"
                  disabled={!form.city || branches.length === 0}
                >
                  {branches.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectField>

                <InputField
                  label="Joining Date"
                  name="joiningDate"
                  type="date"
                  value={form.joiningDate}
                  onChange={update}
                  required
                  containerClassName="space-y-1"
                />

                <InputField
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={update}
                  required
                  containerClassName="md:col-span-2 space-y-1"
                  autoComplete="new-password"
                />

                {/* Avatar Upload with cropper */}
                <AvatarUploader
                  label="Profile Picture"
                  name="avatar"
                  onChange={update}
                  containerClassName="md:col-span-2"
                />

                <div className="md:col-span-2 flex items-center gap-3">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto"
                  >
                    {loading ? "Submitting…" : "Create Account"}
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    By continuing, you agree to our Terms & Privacy.
                  </span>
                </div>
              </form>
            </CardContent>

            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Already registered? Ask the superadmin to approve, then log in.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
