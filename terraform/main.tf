# Define the provider for VirtualBox
provider "virtualbox" {
  version = "2.3.0"
}

# Define a new virtual machine
resource "virtualbox_vm" "example_vm" {
  name           = "example-vm"
  memory         = 1024
  cpus           = 2
  os_type        = "Ubuntu_64"
  boot_order     = ["dvd", "disk"]
  boot_dev1      = "dvd"
  boot_dev2      = "disk"
  enable_acpi    = true
  enable_pae     = true
  enable_ioapic  = true
  vram_size      = 8
}

# Define a storage controller
resource "virtualbox_storage_controller" "example_controller" {
  name        = "SATA Controller"
  bus         = "sata"
  controller_type = "IntelAhci"
}

# Attach a virtual disk to the VM
resource "virtualbox_storage_attach" "example_disk" {
  storage_controller = virtualbox_storage_controller.example_controller.name
  medium            = "file:///path/to/your/ubuntu.iso"
}

# Boot from the virtual disk
resource "virtualbox_vm_boot_order" "example_boot" {
  vm          = virtualbox_vm.example_vm.name
  boot_order  = 1
  storage_attach  = virtualbox_storage_attach.example_disk.id
}
