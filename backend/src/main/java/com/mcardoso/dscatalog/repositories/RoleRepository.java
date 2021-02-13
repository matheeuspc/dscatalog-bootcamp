package com.mcardoso.dscatalog.repositories;

import com.mcardoso.dscatalog.entities.Role;
import com.mcardoso.dscatalog.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}
